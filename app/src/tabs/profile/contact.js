/* Medical Cabinet — editable contact details (Profile → Personal details / Emergency contact).
   Data is saved by serve.py into contact.json next to this file, so every device sees the same values. */
(function () {
  var DEFAULTS = {
    personal: { address: "", phone: "", email: "" },
    emergency: { name: "Ana Creanga", relation: "", phone: "+45 28 41 09 66" }
  };
  var data = JSON.parse(JSON.stringify(DEFAULTS));
  var canSave = true;

  // Load synchronously so the app's first render already shows the saved values.
  try {
    var x = new XMLHttpRequest();
    x.open("GET", "/api/contact", false);
    x.send();
    if (x.status === 200) merge(JSON.parse(x.responseText));
    else canSave = false;
  } catch { canSave = false; }
  if (!canSave) {
    try { var ls = localStorage.getItem("mc-contact"); if (ls) merge(JSON.parse(ls)); } catch { /* private mode: keep defaults */ }
  }

  function merge(d) {
    ["personal", "emergency"].forEach(function (k) {
      if (d && d[k]) for (var f in DEFAULTS[k]) if (typeof d[k][f] === "string") data[k][f] = d[k][f];
    });
  }

  function join(parts) { return parts.filter(function (p) { return p && p.trim(); }).join(" · "); }

  window.MC_meta = function (key) {
    if (key === "personal") {
      var p = data.personal;
      return join([p.phone, p.email]) || p.address || "Address, phone, email";
    }
    var e = data.emergency;
    return join([e.relation ? e.name + " (" + e.relation + ")" : e.name, e.phone]) || "Add an emergency contact";
  };

  var FORMS = {
    "Personal details": {
      key: "personal", title: "Personal details", sub: "How your clinic can reach you",
      fields: [
        { f: "address", label: "Address", type: "text", auto: "street-address", ph: "Street, postcode, city" },
        { f: "phone", label: "Phone", type: "tel", auto: "tel", ph: "+45 00 00 00 00" },
        { f: "email", label: "Email", type: "email", auto: "email", ph: "name@example.com" }
      ]
    },
    "Emergency contact": {
      key: "emergency", title: "Emergency contact", sub: "Who we call if something happens",
      fields: [
        { f: "name", label: "Name", type: "text", auto: "name", ph: "Full name", required: true },
        { f: "relation", label: "Relation", type: "text", auto: "off", ph: "e.g. Wife, brother, friend" },
        { f: "phone", label: "Phone", type: "tel", auto: "tel", ph: "+45 00 00 00 00", required: true }
      ]
    }
  };

  // ---- styles (app palette: ground #f2f2f0, ink #15160f, grey #6d7069, green #00b070) ----
  var css = "" +
    ".mce-scrim{position:absolute;inset:0;z-index:50;background:rgba(20,22,16,.38);display:flex;align-items:flex-end;opacity:0;transition:opacity .2s}" +
    ".mce-scrim.on{opacity:1}" +
    ".mce-sheet{width:100%;background:#fff;border-radius:28px 28px 0 0;padding:10px 20px 26px;display:flex;flex-direction:column;gap:14px;transform:translateY(24px);transition:transform .22s;max-height:92%;overflow-y:auto}" +
    ".mce-scrim.on .mce-sheet{transform:none}" +
    ".mce-grab{width:40px;height:5px;border-radius:3px;background:#dcded8;align-self:center;margin-bottom:4px}" +
    ".mce-head{display:flex;flex-direction:column;gap:3px}" +
    ".mce-title{font-size:20px;font-weight:800;letter-spacing:-.3px;color:#15160f}" +
    ".mce-sub{font-size:13px;font-weight:500;color:#6d7069}" +
    ".mce-field{display:flex;flex-direction:column;gap:6px}" +
    ".mce-label{font-size:11px;font-weight:700;color:#6d7069;letter-spacing:.2px}" +
    ".mce-input{font:inherit;font-size:16px;font-weight:600;color:#15160f;background:#f6f7f4;border:1.5px solid transparent;border-radius:14px;padding:13px 14px;outline:none;width:100%}" +
    ".mce-input::placeholder{color:#a3a69e;font-weight:500}" +
    ".mce-input:focus{border-color:#00b070;background:#fff}" +
    ".mce-input.bad{border-color:#c0392b}" +
    ".mce-err{font-size:12px;font-weight:600;color:#a8321f;min-height:0}" +
    ".mce-row{display:flex;gap:10px;margin-top:4px}" +
    ".mce-btn{font:inherit;font-size:15px;font-weight:800;border:0;border-radius:16px;min-height:50px;padding:0 18px;cursor:pointer;flex:1}" +
    ".mce-cancel{background:#f2f2f0;color:#15160f}.mce-cancel:hover{background:#e6e7e3}" +
    ".mce-save{background:#00b070;color:#fff}.mce-save:hover{background:#009c62}.mce-save:disabled{opacity:.6;cursor:default}" +
    ".mce-toast{position:absolute;left:50%;top:58px;transform:translateX(-50%);z-index:60;background:#15160f;color:#fff;font-size:13px;font-weight:700;padding:11px 16px;border-radius:14px;white-space:nowrap;box-shadow:0 8px 24px rgba(20,22,16,.25)}" +
    ".mce-note{font-size:12px;font-weight:600;color:#7a5a18;background:#fdf3e0;border-radius:12px;padding:9px 12px}";
  var st = document.createElement("style"); st.textContent = css;
  document.head.appendChild(st);

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function host() { return document.querySelector(".mc-phone") || document.body; }

  function toast(msg) {
    var t = el("div", "mce-toast", msg); t.setAttribute("role", "status");
    host().appendChild(t);
    setTimeout(function () { t.remove(); }, 2200);
  }

  function refreshRow(label) {
    var spans = host().querySelectorAll("span");
    for (var i = 0; i < spans.length; i++) {
      if (spans[i].textContent === label) {
        var meta = spans[i].nextElementSibling;
        if (meta) meta.textContent = window.MC_meta(FORMS[label].key);
      }
    }
  }

  function valid(type, v) {
    if (!v) return true;
    if (type === "email") return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    if (type === "tel") return /^\+?[\d\s()-]{6,}$/.test(v);
    return true;
  }

  window.MC_edit = function (label) {
    var cfg = FORMS[label];
    if (!cfg) return;
    var scrim = el("div", "mce-scrim");
    var sheet = el("form", "mce-sheet");
    sheet.setAttribute("role", "dialog"); sheet.setAttribute("aria-modal", "true");
    sheet.setAttribute("aria-label", cfg.title); sheet.noValidate = true;
    sheet.appendChild(el("div", "mce-grab"));
    var head = el("div", "mce-head");
    head.appendChild(el("span", "mce-title", cfg.title));
    head.appendChild(el("span", "mce-sub", cfg.sub));
    sheet.appendChild(head);
    if (!canSave) sheet.appendChild(el("div", "mce-note", "Server not reachable: changes are kept on this device only."));

    var inputs = {};
    cfg.fields.forEach(function (fd) {
      var id = "mce-" + cfg.key + "-" + fd.f;
      var wrap = el("div", "mce-field");
      var lab = el("label", "mce-label", fd.label + (fd.required ? " *" : ""));
      lab.htmlFor = id;
      var inp = el("input", "mce-input");
      inp.id = id; inp.type = fd.type; inp.autocomplete = fd.auto; inp.placeholder = fd.ph;
      inp.value = data[cfg.key][fd.f] || "";
      var err = el("span", "mce-err"); err.id = id + "-err"; inp.setAttribute("aria-describedby", err.id);
      wrap.appendChild(lab); wrap.appendChild(inp); wrap.appendChild(err);
      sheet.appendChild(wrap);
      inputs[fd.f] = { inp: inp, err: err, fd: fd };
    });

    var row = el("div", "mce-row");
    var cancel = el("button", "mce-btn mce-cancel", "Cancel"); cancel.type = "button";
    var save = el("button", "mce-btn mce-save", "Save"); save.type = "submit";
    row.appendChild(cancel); row.appendChild(save); sheet.appendChild(row);
    scrim.appendChild(sheet); host().appendChild(scrim);
    requestAnimationFrame(function () { scrim.classList.add("on"); });
    setTimeout(function () { var first = inputs[cfg.fields[0].f]; if (first && window.matchMedia("(hover:hover)").matches) first.inp.focus(); }, 60);

    function close() { scrim.classList.remove("on"); setTimeout(function () { scrim.remove(); }, 200); document.removeEventListener("keydown", onKey); }
    function onKey(e) { if (e.key === "Escape") close(); }
    document.addEventListener("keydown", onKey);
    cancel.onclick = close;
    scrim.addEventListener("click", function (e) { if (e.target === scrim) close(); });

    sheet.onsubmit = function (e) {
      e.preventDefault();
      var next = {}, ok = true;
      for (var f in inputs) {
        var o = inputs[f], v = o.inp.value.trim(), msg = "";
        if (o.fd.required && !v) msg = o.fd.label + " is required";
        else if (!valid(o.fd.type, v)) msg = o.fd.type === "email" ? "Enter a valid email address" : "Enter a valid phone number";
        o.err.textContent = msg; o.inp.classList.toggle("bad", !!msg);
        if (msg) { if (ok) o.inp.focus(); ok = false; }
        next[f] = v;
      }
      if (!ok) return;
      var all = JSON.parse(JSON.stringify(data)); all[cfg.key] = next;
      save.disabled = true; save.textContent = "Saving…";
      persist(all, function (err) {
        save.disabled = false; save.textContent = "Save";
        if (err) { toast("Could not save — is the server running?"); return; }
        data = all; refreshRow(label); close(); toast("Saved");
      });
    };
  };

  function persist(all, cb) {
    if (!canSave) {
      try { localStorage.setItem("mc-contact", JSON.stringify(all)); cb(null); } catch (e) { cb(e); }
      return;
    }
    fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(all) })
      .then(function (r) { cb(r.ok ? null : new Error(r.status)); })
      .catch(function (e) { cb(e); });
  }
})();
