(function () {
  "use strict";

  var NOTICE = "Find a Tender notice 090514-2026 (Artificial Intelligence Innovation · ORR CT 26-34), fetched for this demo";
  var BUYER = "Office of Rail and Road";
  var CONTACT = "procurementteam@orr.gov.uk";
  var DEADLINE = "15 October 2026, 12:00pm";
  var ENQUIRY = "1 October 2026, 12:00pm";
  var VALUE = "£100,000 excluding VAT · £120,000 including VAT";
  var PORTAL = "https://orr.ukp.app.jaggaer.com/go/8296696501A0D3091277";
  var ADDRESS = "25 Cabot Square, London E14 4QZ, United Kingdom";

  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function tag() {
    return '<span class="tag">' + esc(NOTICE) + "</span>";
  }

  function reply(opts) {
    var html = "";
    if (opts.sample) {
      html += '<p class="sample-note">Labeled sample. Not live ORR data and not a product feature list.</p>';
    }
    if (opts.refuse) {
      html += '<p class="refuse">Refused. The public notice does not cover this, so this prototype will not invent an answer.</p>';
    }
    (opts.paragraphs || []).forEach(function (p) {
      html += "<p>" + p + "</p>";
    });
    if (opts.list && opts.list.length) {
      html += "<ul>" + opts.list.map(function (item) {
        return "<li>" + item + "</li>";
      }).join("") + "</ul>";
    }
    html += "<p>" + tag() + "</p>";
    return html;
  }

  var knowledgeIntents = [
    {
      id: "what",
      label: "What does this agent cover?",
      prompt: "What does the Corporate Knowledge Agent cover?",
      keys: ["what does", "cover", "purpose", "scope", "knowledge agent", "corporate knowledge", "what is this"],
      rank: 10,
      answer: function () {
        return reply({
          paragraphs: [
            "Per the notice, the Corporate Knowledge Agent is one of three Microsoft 365 AI solutions ORR wants delivered. It is described as supporting <strong>knowledge discovery</strong>, <strong>evidence retrieval</strong>, and <strong>expertise identification</strong>.",
            "The notice does not publish a feature catalogue, data sources list, or UI design. This demo only restates that wording and shows labeled sample prompts."
          ]
        });
      }
    },
    {
      id: "discover",
      label: "Find policy evidence (sample)",
      prompt: "Help me discover where ORR keeps guidance on information governance.",
      keys: ["discover", "find", "search", "where", "guidance", "policy", "information governance", "knowledge discovery"],
      rank: 8,
      answer: function () {
        return reply({
          sample: true,
          paragraphs: [
            "Sample knowledge-discovery turn only. A live Corporate Knowledge Agent would search ORR’s approved Microsoft 365 content. This offline prototype has no ORR tenancy and cannot open SharePoint libraries.",
            "What the notice does say: the agent should support knowledge discovery and evidence retrieval inside ORR’s Microsoft 365 environment, alongside a separate SharePoint remediation / records-retention solution."
          ],
          list: [
            "Would look across approved knowledge stores (not specified in the notice)",
            "Would return evidence with source pointers for a human to check",
            "Would not invent a policy text that is not in those stores"
          ]
        });
      }
    },
    {
      id: "evidence",
      label: "Retrieve evidence (sample)",
      prompt: "Retrieve evidence that retention rules apply to project SharePoint sites.",
      keys: ["evidence", "retrieve", "retention", "citation", "source", "proof"],
      rank: 8,
      answer: function () {
        return reply({
          sample: true,
          paragraphs: [
            "Sample evidence-retrieval turn. The notice pairs the Knowledge Agent with an AI-enabled records retention and SharePoint remediation solution for information governance, metadata management, and retention compliance.",
            "This prototype cannot cite ORR documents. A delivered agent would surface passages from ORR’s own M365 content for staff to verify—not replace records officers."
          ]
        });
      }
    },
    {
      id: "expertise",
      label: "Identify expertise (sample)",
      prompt: "Who in ORR would know about strategic workforce planning data?",
      keys: ["expertise", "who knows", "expert", "specialist", "identify", "contact person", "who in orr"],
      rank: 8,
      answer: function () {
        return reply({
          sample: true,
          paragraphs: [
            "Sample expertise-identification turn. The notice names expertise identification as a Knowledge Agent outcome. It does not publish an ORR staff directory or skills graph.",
            "This demo will not invent names, emails, or teams. Procurement contact on the notice is <strong>" + esc(CONTACT) + "</strong> for tender questions via the ORR eTendering portal—not for operational expertise routing."
          ]
        });
      }
    },
    {
      id: "three",
      label: "All three solutions?",
      prompt: "What are the three AI solutions in the notice?",
      keys: ["three", "solutions", "sharepoint", "remediation", "records", "retention", "all three"],
      rank: 9,
      answer: function () {
        return reply({
          paragraphs: [
            "The notice lists three Microsoft 365 AI solutions:",
            "This chat samples only the Corporate Knowledge Agent and the Strategic Workforce Planning Agent. The SharePoint remediation / records-retention solution is out of scope for this scripted desk."
          ],
          list: [
            "(1) AI-enabled records retention and SharePoint remediation — information governance, metadata, retention compliance",
            "(2) Corporate Knowledge Agent — knowledge discovery, evidence retrieval, expertise identification",
            "(3) Strategic Workforce Planning Agent — workforce forecasting, scenario modelling, resource planning"
          ]
        });
      }
    },
    {
      id: "m365",
      label: "Microsoft 365 / delivery",
      prompt: "What delivery work is in scope for Microsoft 365?",
      keys: ["microsoft", "m365", "365", "delivery", "implement", "deploy", "training", "handover", "security"],
      rank: 7,
      answer: function () {
        return reply({
          paragraphs: [
            "The notice asks for a specialist Microsoft AI delivery partner. Scope includes discovery, solution design, development, configuration, testing, security assurance, deployment, documentation, training, knowledge transfer and handover, with solutions fully operational and supported by ORR by project completion.",
            "Estimated contract dates: 26 October 2026 to 9 April 2027, with a possible extension to 9 April 2028 at ORR’s discretion."
          ]
        });
      }
    },
    {
      id: "tender",
      label: "Tender deadline & contact",
      prompt: "What is the tender deadline and buyer contact?",
      keys: ["deadline", "tender", "submit", "contact", "email", "buyer", "procurement", "enquiry", "jaggaer", "portal", "value", "price"],
      rank: 9,
      answer: function () {
        return reply({
          paragraphs: [
            "<strong>Buyer:</strong> " + esc(BUYER) + " · " + esc(ADDRESS),
            "<strong>Tender submission deadline:</strong> " + esc(DEADLINE) + ". Enquiry deadline on the notice: " + esc(ENQUIRY) + ".",
            "<strong>Email:</strong> " + esc(CONTACT) + ". Clarifications and bids go through the ORR eTendering portal.",
            "<strong>Estimated value:</strong> " + esc(VALUE) + ". Portal link printed on the notice: " + esc(PORTAL)
          ]
        });
      }
    }
  ];

  var workforceIntents = [
    {
      id: "what",
      label: "What does this agent cover?",
      prompt: "What does the Strategic Workforce Planning Agent cover?",
      keys: ["what does", "cover", "purpose", "scope", "workforce", "planning agent", "what is this"],
      rank: 10,
      answer: function () {
        return reply({
          paragraphs: [
            "Per the notice, the Strategic Workforce Planning Agent supports <strong>workforce forecasting</strong>, <strong>scenario modelling</strong>, and <strong>resource planning</strong> inside ORR’s Microsoft 365 environment.",
            "The notice does not define data feeds, headcount figures, or modelling methods. This demo only restates that wording and shows labeled sample prompts."
          ]
        });
      }
    },
    {
      id: "forecast",
      label: "Workforce forecast (sample)",
      prompt: "Show a sample workforce forecast for the next planning year.",
      keys: ["forecast", "headcount", "fte", "projection", "next year", "capacity"],
      rank: 8,
      answer: function () {
        return reply({
          sample: true,
          paragraphs: [
            "Sample forecast illustration only. Figures below are invented for the demo UI and are <strong>not</strong> ORR statistics.",
            "A live agent would use ORR-approved workforce data in Microsoft 365. This offline prototype has none of that data."
          ],
          list: [
            "Sample baseline: 100 FTE (placeholder)",
            "Sample planned hires: +8 FTE across two directorates (placeholder)",
            "Sample attrition assumption: 6% (placeholder)",
            "Refuse any request for real ORR headcount—the notice does not publish it"
          ]
        });
      }
    },
    {
      id: "scenario",
      label: "Scenario modelling (sample)",
      prompt: "Model a scenario if a major programme needs 12 extra analysts.",
      keys: ["scenario", "model", "modelling", "what if", "extra", "analyst", "surge"],
      rank: 8,
      answer: function () {
        return reply({
          sample: true,
          paragraphs: [
            "Sample scenario-modelling turn. The notice names scenario modelling as an outcome; it does not prescribe algorithms or approval workflows.",
            "Placeholder comparison for demo labeling only:"
          ],
          list: [
            "Scenario A — hire 12 contractors for 9 months (cost/time placeholders only)",
            "Scenario B — redeploy 6 internal + hire 6 (placeholders)",
            "Scenario C — phase demand over two financial years (placeholders)",
            "A human planner would validate assumptions; this chat does not approve budgets"
          ]
        });
      }
    },
    {
      id: "resource",
      label: "Resource planning (sample)",
      prompt: "Help plan resources across teams for Q1.",
      keys: ["resource", "plan", "allocation", "roster", "team", "q1", "capacity plan"],
      rank: 8,
      answer: function () {
        return reply({
          sample: true,
          paragraphs: [
            "Sample resource-planning turn. The notice lists resource planning alongside forecasting and scenario modelling.",
            "This prototype will not allocate real people or publish ORR org charts. A delivered agent would work from ORR’s own M365-held planning inputs under ORR security assurance."
          ]
        });
      }
    },
    {
      id: "three",
      label: "All three solutions?",
      prompt: "How does workforce planning sit with the other AI solutions?",
      keys: ["three", "solutions", "sharepoint", "knowledge", "together", "other"],
      rank: 7,
      answer: function () {
        return reply({
          paragraphs: [
            "Workforce planning is solution (3) in the same ORR CT 26-34 package as SharePoint remediation (1) and the Corporate Knowledge Agent (2). All three are to be designed, developed, and implemented in Microsoft 365 by a specialist Microsoft AI delivery partner.",
            "Switch to the Corporate Knowledge Agent tab in this demo to sample discovery / evidence / expertise prompts. SharePoint remediation is not scripted here."
          ]
        });
      }
    },
    {
      id: "tender",
      label: "Tender deadline & contact",
      prompt: "What is the tender deadline and buyer contact?",
      keys: ["deadline", "tender", "submit", "contact", "email", "buyer", "procurement", "enquiry", "jaggaer", "portal", "value", "price"],
      rank: 9,
      answer: function () {
        return reply({
          paragraphs: [
            "<strong>Buyer:</strong> " + esc(BUYER) + " · " + esc(ADDRESS),
            "<strong>Tender submission deadline:</strong> " + esc(DEADLINE) + ". Enquiry deadline on the notice: " + esc(ENQUIRY) + ".",
            "<strong>Email:</strong> " + esc(CONTACT) + ". Clarifications and bids go through the ORR eTendering portal.",
            "<strong>Estimated value:</strong> " + esc(VALUE) + "."
          ]
        });
      }
    }
  ];

  function refuseAnswer(agent) {
    var base =
      agent === "workforce"
        ? "This Strategic Workforce Planning sample only speaks to forecasting, scenario modelling, and resource planning as named in the notice—plus basic tender facts printed there."
        : "This Corporate Knowledge sample only speaks to knowledge discovery, evidence retrieval, and expertise identification as named in the notice—plus basic tender facts printed there.";
    return reply({
      refuse: true,
      paragraphs: [
        base,
        "Examples this prototype will not answer: rail safety rulings, licensing decisions, live ORR staff directories, real salaries or headcount, bid strategy for 92 Logics, or any feature not written on notice 090514-2026.",
        "For procurement clarifications, use the ORR eTendering portal; notice email is " + esc(CONTACT) + "."
      ]
    });
  }

  function normalize(text) {
    return String(text || "")
      .toLowerCase()
      .replace(/[^\w\s@./-]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function matchIntent(intents, text) {
    var q = normalize(text);
    if (!q) return null;
    var best = null;
    var bestScore = 0;
    intents.forEach(function (intent) {
      var score = 0;
      intent.keys.forEach(function (key) {
        if (q.indexOf(key) !== -1) score += key.length;
      });
      score += intent.rank * 0.01;
      if (score > bestScore) {
        bestScore = score;
        best = intent;
      }
    });
    if (bestScore < 3) return null;
    return best;
  }

  var state = { agent: "knowledge" };
  var chips = document.getElementById("chips");
  var thread = document.getElementById("thread");
  var form = document.getElementById("composer");
  var ask = document.getElementById("ask");
  var stageKicker = document.getElementById("stage-kicker");
  var stageName = document.getElementById("stage-name");

  function intentsFor() {
    return state.agent === "workforce" ? workforceIntents : knowledgeIntents;
  }

  function agentLabel() {
    return state.agent === "workforce"
      ? "Strategic Workforce Planning Agent"
      : "Corporate Knowledge Agent";
  }

  function agentSubtitle() {
    return state.agent === "workforce"
      ? "Workforce forecasting · scenario modelling · resource planning"
      : "Knowledge discovery · evidence retrieval · expertise identification";
  }

  function greet() {
    thread.innerHTML = "";
    addBubble(
      "agent",
      agentLabel(),
      reply({
        paragraphs: [
          "Scripted prototype by 92 Logics for ORR CT 26-34. I only answer from the public Find a Tender notice.",
          state.agent === "workforce"
            ? "You are in the Strategic Workforce Planning Agent sample."
            : "You are in the Corporate Knowledge Agent sample.",
          "Pick a chip or type a question. Anything outside the notice is refused."
        ]
      })
    );
  }

  function renderChips() {
    chips.innerHTML = "";
    intentsFor().forEach(function (intent) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = intent.label;
      btn.addEventListener("click", function () {
        ask.value = intent.prompt;
        handleAsk(intent.prompt);
      });
      chips.appendChild(btn);
    });
  }

  function addBubble(role, who, html) {
    var div = document.createElement("div");
    div.className = "bubble " + role;
    div.innerHTML = '<p class="who">' + esc(who) + "</p>" + html;
    thread.appendChild(div);
    thread.scrollTop = thread.scrollHeight;
  }

  function handleAsk(text) {
    var q = String(text || "").trim();
    if (!q) return;
    addBubble("user", "You", "<p>" + esc(q) + "</p>");
    var intent = matchIntent(intentsFor(), q);
    var html = intent ? intent.answer() : refuseAnswer(state.agent);
    addBubble("agent", agentLabel(), html);
    ask.value = "";
  }

  document.querySelectorAll('input[name="agent"]').forEach(function (input) {
    input.addEventListener("change", function () {
      if (!input.checked) return;
      state.agent = input.value;
      stageKicker.textContent = agentLabel();
      stageName.textContent = agentSubtitle();
      renderChips();
      greet();
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    handleAsk(ask.value);
  });

  renderChips();
  greet();
})();
