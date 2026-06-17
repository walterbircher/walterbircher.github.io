(function () {
  const catalog = window.CURE_TRANSLATIONS;
  if (!catalog) return;

  function normalizeRecord(record) {
    const normalized = {};

    Object.entries(record).forEach(([key, value]) => {
      normalized[catalog.normalizeKey ? catalog.normalizeKey(key) : key] = value;
    });

    return normalized;
  }

  const flagLabels = {
    en: "\uD83C\uDDFA\uD83C\uDDF8 English",
    es: "\uD83C\uDDEA\uD83C\uDDF8 Espa\u00F1ol",
    fr: "\uD83C\uDDEB\uD83C\uDDF7 Fran\u00E7ais",
    pt: "\uD83C\uDDE7\uD83C\uDDF7 Portugu\u00EAs",
    de: "\uD83C\uDDE9\uD83C\uDDEA Deutsch",
    it: "\uD83C\uDDEE\uD83C\uDDF9 Italiano",
    zh: "\uD83C\uDDE8\uD83C\uDDF3 \u4E2D\u6587 (\u7B80\u4F53)",
    ja: "\uD83C\uDDEF\uD83C\uDDF5 \u65E5\u672C\u8A9E",
    ko: "\uD83C\uDDF0\uD83C\uDDF7 \uD55C\uAD6D\uC5B4"
  };

  const newLanguages = [
    { code: "de", label: "Deutsch" },
    { code: "it", label: "Italiano" },
    { code: "zh", label: "中文 (简体)" },
    { code: "ja", label: "日本語" },
    { code: "ko", label: "한국어" }
  ];

  const plainLabels = {
    en: "English",
    es: "Espa\u00F1ol",
    fr: "Fran\u00E7ais",
    pt: "Portugu\u00EAs",
    de: "Deutsch",
    it: "Italiano",
    zh: "\u4E2D\u6587 (\u7B80\u4F53)",
    ja: "\u65E5\u672C\u8A9E",
    ko: "\uD55C\uAD6D\uC5B4"
  };

  newLanguages.forEach((entry) => {
    if (!catalog.languages.some((language) => language.code === entry.code)) {
      catalog.languages.push(entry);
    }
  });

  catalog.languages = catalog.languages.map((language) => ({
    ...language,
    label: flagLabels[language.code] || language.label
  }));

  catalog.languages = catalog.languages.map((language) => ({
    ...language,
    label: plainLabels[language.code] || language.label
  }));

  Object.assign(catalog.locales, {
    de: "de-DE",
    it: "it-IT",
    zh: "zh-CN",
    ja: "ja-JP",
    ko: "ko-KR"
  });

  Object.assign(catalog.text, {
    de: normalizeRecord({
      "cureEDMD.org | Home": "cureEDMD.org | Startseite",
      "cureEDMD.org | Who We Are": "cureEDMD.org | Wer wir sind",
      "cureEDMD.org | What Is EDMD": "cureEDMD.org | Was ist EDMD",
      "cureEDMD.org | Research": "cureEDMD.org | Forschung",
      "cureEDMD.org | Resources": "cureEDMD.org | Ressourcen",
      "cureEDMD.org | News and Updates": "cureEDMD.org | Nachrichten und Updates",
      "cureEDMD.org | Help Change Lives": "cureEDMD.org | Leben verändern helfen",
      "cureEDMD.org | Financial Transparency": "cureEDMD.org | Finanzielle Transparenz",
      "cureEDMD.org | Privacy": "cureEDMD.org | Datenschutz",
      "cureEDMD is a patient and family-led, scientist-supported foundation focused on better care, better treatments, and a cure for EDMD.": "cureEDMD ist eine von Patienten und Familien geführte, wissenschaftlich unterstützte Stiftung mit Fokus auf bessere Versorgung, bessere Behandlungen und eine Heilung für EDMD.",
      "Mission, history, and accomplishments of cureEDMD in clear language.": "Mission, Geschichte und Erfolge von cureEDMD in klarer Sprache.",
      "Plain-language EDMD overview: symptoms, genetics, diagnosis, and management.": "EDMD im Überblick in einfacher Sprache: Symptome, Genetik, Diagnose und Behandlung.",
      "Current EDMD research priorities and partner labs in plain language.": "Aktuelle Forschungsprioritäten zu EDMD und Partnerlabore in einfacher Sprache.",
      "Resources for EDMD patients, families, and caregivers: registries, support groups, and downloads.": "Ressourcen für EDMD-Patienten, Familien und Betreuungspersonen: Register, Unterstützungsgruppen und Downloads.",
      "Quarterly and monthly proof-of-activity updates for cureEDMD.": "Monatliche und vierteljährliche Aktivitätsupdates von cureEDMD.",
      "Donate, volunteer, partner, and join studies to help move EDMD progress forward.": "Spenden Sie, engagieren Sie sich, kooperieren Sie und nehmen Sie an Studien teil, um den Fortschritt bei EDMD voranzubringen.",
      "Financial transparency and governance information for cureEDMD, including annual reports, financial filings, and policy documents.": "Informationen zur finanziellen Transparenz und Governance von cureEDMD, einschließlich Jahresberichte, Finanzunterlagen und Richtliniendokumente.",
      "Privacy policy and data collection practices for cureEDMD.": "Datenschutzerklärung und Verfahren zur Datenerhebung von cureEDMD.",
      "Skip to content": "Zum Inhalt springen",
      "Loading latest cureEDMD updates...": "Neueste cureEDMD-Aktualisierungen werden geladen...",
      "Action for every family": "Engagement für jede Familie",
      "Menu": "Menü",
      "Home": "Startseite",
      "Who We Are": "Wer wir sind",
      "What Is EDMD": "Was ist EDMD",
      "Research": "Forschung",
      "Resources": "Ressourcen",
      "News": "Nachrichten",
      "Help Change Lives": "Leben verändern helfen",
      "Donate": "Spenden",
      "Language": "Sprache",
      "Select language": "Sprache auswählen",
      "Primary navigation": "Hauptnavigation",
      "Hero slide navigation": "Navigation der Hauptfolien",
      "Previous story": "Vorherige Geschichte",
      "Next story": "Nächste Geschichte",
      "Working Together for cureEDMD": "Gemeinsam für cureEDMD",
      "Quick Links": "Schnellzugriff",
      "Find Resources": "Ressourcen finden",
      "Learn About EDMD": "Mehr über EDMD erfahren",
      "Newly diagnosed?": "Neu diagnostiziert?",
      "Start with simple, plain-language information about symptoms, genetics, and care planning.": "Beginnen Sie mit einfachen, leicht verständlichen Informationen zu Symptomen, Genetik und Pflegeplanung.",
      "Go to What Is EDMD": "Zu Was ist EDMD",
      "Need practical tools?": "Brauchen Sie praktische Hilfen?",
      "Get links for patient registries, support communities, and download resources.": "Finden Sie Links zu Patientenregistern, Unterstützungsgruppen und Materialien zum Herunterladen.",
      "Go to Resources": "Zu Ressourcen",
      "Want to help now?": "Möchten Sie jetzt helfen?",
      "Donate, volunteer, and connect with the mission in ways that fit your capacity.": "Spenden Sie, engagieren Sie sich ehrenamtlich und unterstützen Sie die Mission auf eine Weise, die zu Ihren Möglichkeiten passt.",
      "Go to Help Change Lives": "Zu Leben verändern helfen",
      "Latest": "Neueste",
      "Snapshot": "Überblick",
      "Impact": "Wirkung",
      "Photos": "Fotos",
      "Stories": "Geschichten",
      "Take Action": "Jetzt handeln",
      "Every donation counts": "Jede Spende zählt",
      "Contributions help fund treatment-focused research and family support resources. If you cannot donate now, sharing resources and joining studies also helps.": "Beiträge helfen, behandlungsorientierte Forschung und Unterstützungsangebote für Familien zu finanzieren. Wenn Sie jetzt nicht spenden können, helfen auch das Teilen von Ressourcen und die Teilnahme an Studien.",
      "Choose an amount (demo)": "Wählen Sie einen Betrag (Demo)",
      "Donate Now": "Jetzt spenden",
      "Volunteer and Partner": "Engagieren und kooperieren",
      "Current image is a placeholder. Replace with cureEDMD family photography.": "Das aktuelle Bild ist ein Platzhalter. Ersetzen Sie es durch echte Fotos von cureEDMD-Familien.",
      "Financial Transparency": "Finanzielle Transparenz",
      "Privacy": "Datenschutz",
      "Draft for cureEDMD.org | Not medical advice. For emergencies, contact local emergency services.": "Entwurf für cureEDMD.org | Keine medizinische Beratung. Wenden Sie sich im Notfall an Ihre örtlichen Rettungsdienste.",
      "Email: info@cureEDMD.org": "E-Mail: info@cureEDMD.org",
      "cureEDMD was established in 2025. Before the foundation was formally launched, the founders had already been raising and directing funding for EDMD research for many years.": "cureEDMD wurde 2025 gegründet. Schon vor dem offiziellen Start der Stiftung sammelten die Gründer seit vielen Jahren Mittel für die EDMD-Forschung und leiteten sie gezielt weiter.",
      "Emery-Dreifuss muscular dystrophy (EDMD) is a rare, progressive muscle disease. It was first described in the 1960s. EDMD is known for three common feature groups: joint stiffness, muscle weakness, and heart problems.": "Die Emery-Dreifuss-Muskeldystrophie (EDMD) ist eine seltene, fortschreitende Muskelerkrankung. Sie wurde erstmals in den 1960er-Jahren beschrieben. EDMD ist vor allem durch drei häufige Merkmalsgruppen gekennzeichnet: Gelenksteife, Muskelschwäche und Herzprobleme.",
      "Based on cureEDMD source pages, current research focus is in two main areas: treatment-target discovery and gene therapy.": "Auf Grundlage der cureEDMD-Quellseiten liegt der aktuelle Forschungsschwerpunkt in zwei Hauptbereichen: der Identifizierung von Therapiezielen und der Gentherapie.",
      "These links come directly from current cureEDMD and EDMD Foundation resource pages, rewritten in clear language.": "Diese Links stammen direkt aus den aktuellen Ressourcenseiten von cureEDMD und der EDMD Foundation und wurden in klarer Sprache neu formuliert.",
      "This page follows your team note that new visitors should quickly see activity. Use this as a living log with monthly and quarterly updates.": "Diese Seite folgt Ihrem Teamhinweis, dass neue Besucher schnell Aktivitäten erkennen sollen. Nutzen Sie sie als lebendiges Protokoll mit monatlichen und vierteljährlichen Updates.",
      "Contributions support research, patient resources, and community growth. Donations are important, but volunteering, sharing, and partnering also make a difference.": "Beiträge unterstützen Forschung, Patientenressourcen und das Wachstum der Gemeinschaft. Spenden sind wichtig, aber auch ehrenamtliches Engagement, Teilen und Partnerschaften machen einen Unterschied.",
      "cureEDMD is committed to clear public reporting. As filings are finalized, we will publish annual reports, IRS forms, audited statements, and governance documents here.": "cureEDMD verpflichtet sich zu einer klaren öffentlichen Berichterstattung. Sobald Unterlagen finalisiert sind, veröffentlichen wir hier Jahresberichte, IRS-Formulare, geprüfte Abschlüsse und Governance-Dokumente.",
      "cureEDMD respects your privacy and is committed to transparent data practices.": "cureEDMD respektiert Ihre Privatsphäre und verpflichtet sich zu transparenten Datenpraktiken.",
      "Mission": "Mission",
      "Accomplishments": "Erfolge",
      "Progress already made": "Bisher erzielter Fortschritt",
      "Founders": "Gründer",
      "People behind the mission": "Menschen hinter der Mission",
      "Genetics": "Genetik",
      "Diagnosis and care": "Diagnose und Versorgung",
      "Visual Guide": "Visuelle Anleitung",
      "EDMD pathway": "EDMD-Weg",
      "Partner Labs": "Partnerlabore",
      "Featured researchers": "Vorgestellte Forschende",
      "Research roadmap": "Forschungsfahrplan",
      "Study participation": "Teilnahme an Studien",
      "Downloads": "Downloads",
      "Helpful documents for appointments and emergencies": "Hilfreiche Dokumente für Termine und Notfälle",
      "One-page guide": "Einseitiger Leitfaden",
      "FAQ": "FAQ",
      "Why registries are important": "Warum Register wichtig sind",
      "Suggested recurring posts": "Empfohlene wiederkehrende Beiträge",
      "Update format": "Update-Format",
      "Email updates": "E-Mail-Updates",
      "Accountability": "Rechenschaft",
      "Published materials": "Veröffentlichte Materialien",
      "What we plan to post": "Was wir veröffentlichen möchten",
      "How to help": "Wie Sie helfen können",
      "Need a document before it is posted?": "Benötigen Sie ein Dokument, bevor es veröffentlicht wird?",
      "Contact": "Kontakt",
      "Questions about transparency?": "Fragen zur Transparenz?",
      "Privacy Statement": "Datenschutzerklärung",
      "What information we collect": "Welche Informationen wir erfassen",
      "How we use your information": "Wie wir Ihre Informationen verwenden",
      "Data security": "Datensicherheit",
      "Your rights": "Ihre Rechte",
      "Third parties": "Dritte",
      "Contact us": "Kontaktieren Sie uns",
      "Last updated: 2026": "Zuletzt aktualisiert: 2026",
      "Send requests for records or corrections to info@cureEDMD.org.": "Senden Sie Anfragen zu Unterlagen oder Korrekturen an info@cureEDMD.org.",
      "Request documents": "Dokumente anfordern",
      "Support the mission": "Die Mission unterstützen",
      "Donate via Rare Village": "Über Rare Village spenden",
      "Contact Our Team": "Unser Team kontaktieren",
      "Open Facebook Group": "Facebook-Gruppe öffnen",
      "Open Columbia Registry": "Columbia-Register öffnen",
      "Open LMNA Registry": "LMNA-Register öffnen",
      "Download Wallet Card": "Notfallkarte herunterladen",
      "Download Family Tree Template": "Vorlage für Stammbaum herunterladen",
      "Annual reports": "Jahresberichte",
      "Financial reports": "Finanzberichte",
      "Governance and legal": "Governance und Rechtliches",
      "Board roster": "Vorstandsliste",
      "Conflict policy": "Konfliktrichtlinie",
      "Tax and compliance details": "Steuer- und Compliance-Details",
      "Pending": "Ausstehend",
      "Archive": "Archiv",
      "Coming soon": "Demnächst",
      "In review": "In Prüfung",
      "On file": "Vorliegend",
      "Provide services and support you have requested": "Bereitstellung angeforderter Leistungen und Unterstützung",
      "Improve our website and programs": "Verbesserung unserer Website und Programme",
      "Send updates and communications (with your consent)": "Versand von Updates und Mitteilungen (mit Ihrer Zustimmung)",
      "Comply with legal obligations": "Erfüllung gesetzlicher Verpflichtungen"
    }),
    it: normalizeRecord({
      "cureEDMD.org | Home": "cureEDMD.org | Home",
      "cureEDMD.org | Who We Are": "cureEDMD.org | Chi siamo",
      "cureEDMD.org | What Is EDMD": "cureEDMD.org | Che cos'è la EDMD",
      "cureEDMD.org | Research": "cureEDMD.org | Ricerca",
      "cureEDMD.org | Resources": "cureEDMD.org | Risorse",
      "cureEDMD.org | News and Updates": "cureEDMD.org | Notizie e aggiornamenti",
      "cureEDMD.org | Help Change Lives": "cureEDMD.org | Aiuta a cambiare vite",
      "cureEDMD.org | Financial Transparency": "cureEDMD.org | Trasparenza finanziaria",
      "cureEDMD.org | Privacy": "cureEDMD.org | Privacy",
      "cureEDMD is a patient and family-led, scientist-supported foundation focused on better care, better treatments, and a cure for EDMD.": "cureEDMD è una fondazione guidata da pazienti e famiglie, sostenuta dalla comunità scientifica e concentrata su cure migliori, trattamenti migliori e una cura per la EDMD.",
      "Mission, history, and accomplishments of cureEDMD in clear language.": "Missione, storia e risultati di cureEDMD in un linguaggio chiaro.",
      "Plain-language EDMD overview: symptoms, genetics, diagnosis, and management.": "Panoramica della EDMD in linguaggio semplice: sintomi, genetica, diagnosi e gestione.",
      "Current EDMD research priorities and partner labs in plain language.": "Le attuali priorità di ricerca sulla EDMD e i laboratori partner in linguaggio chiaro.",
      "Resources for EDMD patients, families, and caregivers: registries, support groups, and downloads.": "Risorse per pazienti con EDMD, famiglie e caregiver: registri, gruppi di supporto e download.",
      "Quarterly and monthly proof-of-activity updates for cureEDMD.": "Aggiornamenti mensili e trimestrali sulle attività di cureEDMD.",
      "Donate, volunteer, partner, and join studies to help move EDMD progress forward.": "Dona, fai volontariato, collabora e partecipa agli studi per far progredire la EDMD.",
      "Financial transparency and governance information for cureEDMD, including annual reports, financial filings, and policy documents.": "Informazioni sulla trasparenza finanziaria e sulla governance di cureEDMD, inclusi rapporti annuali, documenti finanziari e politiche.",
      "Privacy policy and data collection practices for cureEDMD.": "Informativa sulla privacy e pratiche di raccolta dati di cureEDMD.",
      "Skip to content": "Vai al contenuto",
      "Loading latest cureEDMD updates...": "Caricamento degli ultimi aggiornamenti di cureEDMD...",
      "Action for every family": "Azione per ogni famiglia",
      "Menu": "Menu",
      "Home": "Home",
      "Who We Are": "Chi siamo",
      "What Is EDMD": "Che cos'è la EDMD",
      "Research": "Ricerca",
      "Resources": "Risorse",
      "News": "Notizie",
      "Help Change Lives": "Aiuta a cambiare vite",
      "Donate": "Dona",
      "Language": "Lingua",
      "Select language": "Seleziona lingua",
      "Primary navigation": "Navigazione principale",
      "Hero slide navigation": "Navigazione delle slide principali",
      "Previous story": "Storia precedente",
      "Next story": "Storia successiva",
      "Working Together for cureEDMD": "Insieme per cureEDMD",
      "Quick Links": "Link rapidi",
      "Find Resources": "Trova risorse",
      "Learn About EDMD": "Scopri la EDMD",
      "Newly diagnosed?": "Diagnosi recente?",
      "Start with simple, plain-language information about symptoms, genetics, and care planning.": "Inizia con informazioni semplici e chiare su sintomi, genetica e pianificazione delle cure.",
      "Go to What Is EDMD": "Vai a Che cos'è la EDMD",
      "Need practical tools?": "Hai bisogno di strumenti pratici?",
      "Get links for patient registries, support communities, and download resources.": "Trova link a registri dei pazienti, comunità di supporto e risorse da scaricare.",
      "Go to Resources": "Vai a Risorse",
      "Want to help now?": "Vuoi aiutare subito?",
      "Donate, volunteer, and connect with the mission in ways that fit your capacity.": "Dona, fai volontariato e sostieni la missione in un modo adatto alle tue possibilità.",
      "Go to Help Change Lives": "Vai a Aiuta a cambiare vite",
      "Latest": "Ultime notizie",
      "Snapshot": "Panoramica",
      "Impact": "Impatto",
      "Photos": "Foto",
      "Stories": "Storie",
      "Take Action": "Agisci",
      "Every donation counts": "Ogni donazione conta",
      "Contributions help fund treatment-focused research and family support resources. If you cannot donate now, sharing resources and joining studies also helps.": "I contributi aiutano a finanziare la ricerca orientata ai trattamenti e le risorse di supporto per le famiglie. Se non puoi donare ora, aiutano anche la condivisione delle risorse e la partecipazione agli studi.",
      "Choose an amount (demo)": "Scegli un importo (demo)",
      "Donate Now": "Dona ora",
      "Volunteer and Partner": "Volontariato e partnership",
      "Current image is a placeholder. Replace with cureEDMD family photography.": "L'immagine attuale è un segnaposto. Sostituiscila con fotografie reali delle famiglie cureEDMD.",
      "Financial Transparency": "Trasparenza finanziaria",
      "Privacy": "Privacy",
      "Draft for cureEDMD.org | Not medical advice. For emergencies, contact local emergency services.": "Bozza per cureEDMD.org | Non costituisce consulenza medica. In caso di emergenza, contatta i servizi di emergenza locali.",
      "Email: info@cureEDMD.org": "Email: info@cureEDMD.org",
      "cureEDMD was established in 2025. Before the foundation was formally launched, the founders had already been raising and directing funding for EDMD research for many years.": "cureEDMD è stata fondata nel 2025. Prima del lancio ufficiale della fondazione, i fondatori raccoglievano già da molti anni fondi per la ricerca sulla EDMD e li indirizzavano in modo mirato.",
      "Emery-Dreifuss muscular dystrophy (EDMD) is a rare, progressive muscle disease. It was first described in the 1960s. EDMD is known for three common feature groups: joint stiffness, muscle weakness, and heart problems.": "La distrofia muscolare di Emery-Dreifuss (EDMD) è una malattia muscolare rara e progressiva. È stata descritta per la prima volta negli anni Sessanta. La EDMD è nota per tre gruppi comuni di caratteristiche: rigidità articolare, debolezza muscolare e problemi cardiaci.",
      "Based on cureEDMD source pages, current research focus is in two main areas: treatment-target discovery and gene therapy.": "In base alle pagine di riferimento di cureEDMD, l'attuale ricerca si concentra su due aree principali: individuazione di bersagli terapeutici e terapia genica.",
      "These links come directly from current cureEDMD and EDMD Foundation resource pages, rewritten in clear language.": "Questi link provengono direttamente dalle attuali pagine di risorse di cureEDMD e della EDMD Foundation, riscritte in linguaggio chiaro.",
      "This page follows your team note that new visitors should quickly see activity. Use this as a living log with monthly and quarterly updates.": "Questa pagina segue la nota del tuo team secondo cui i nuovi visitatori dovrebbero vedere rapidamente l'attività. Usala come registro vivo con aggiornamenti mensili e trimestrali.",
      "Contributions support research, patient resources, and community growth. Donations are important, but volunteering, sharing, and partnering also make a difference.": "I contributi sostengono la ricerca, le risorse per i pazienti e la crescita della comunità. Le donazioni sono importanti, ma fanno la differenza anche il volontariato, la condivisione e le collaborazioni.",
      "cureEDMD is committed to clear public reporting. As filings are finalized, we will publish annual reports, IRS forms, audited statements, and governance documents here.": "cureEDMD si impegna a garantire una comunicazione pubblica chiara. Man mano che i documenti saranno finalizzati, pubblicheremo qui rapporti annuali, moduli IRS, bilanci revisionati e documenti di governance.",
      "cureEDMD respects your privacy and is committed to transparent data practices.": "cureEDMD rispetta la tua privacy e si impegna a pratiche trasparenti nella gestione dei dati.",
      "Mission": "Missione",
      "Accomplishments": "Risultati",
      "Progress already made": "Progressi già raggiunti",
      "Founders": "Fondatori",
      "People behind the mission": "Le persone dietro la missione",
      "Genetics": "Genetica",
      "Diagnosis and care": "Diagnosi e cura",
      "Visual Guide": "Guida visiva",
      "EDMD pathway": "Percorso della EDMD",
      "Partner Labs": "Laboratori partner",
      "Featured researchers": "Ricercatori in evidenza",
      "Research roadmap": "Roadmap della ricerca",
      "Study participation": "Partecipazione agli studi",
      "Downloads": "Download",
      "Helpful documents for appointments and emergencies": "Documenti utili per visite ed emergenze",
      "One-page guide": "Guida in una pagina",
      "FAQ": "FAQ",
      "Why registries are important": "Perché i registri sono importanti",
      "Suggested recurring posts": "Post ricorrenti suggeriti",
      "Update format": "Formato degli aggiornamenti",
      "Email updates": "Aggiornamenti via email",
      "Accountability": "Responsabilità",
      "Published materials": "Materiali pubblicati",
      "What we plan to post": "Cosa prevediamo di pubblicare",
      "How to help": "Come aiutare",
      "Need a document before it is posted?": "Hai bisogno di un documento prima che venga pubblicato?",
      "Contact": "Contatto",
      "Questions about transparency?": "Domande sulla trasparenza?",
      "Privacy Statement": "Informativa sulla privacy",
      "What information we collect": "Quali informazioni raccogliamo",
      "How we use your information": "Come usiamo le tue informazioni",
      "Data security": "Sicurezza dei dati",
      "Your rights": "I tuoi diritti",
      "Third parties": "Terze parti",
      "Contact us": "Contattaci",
      "Last updated: 2026": "Ultimo aggiornamento: 2026",
      "Send requests for records or corrections to info@cureEDMD.org.": "Invia richieste di documenti o correzioni a info@cureEDMD.org.",
      "Request documents": "Richiedi documenti",
      "Support the mission": "Sostieni la missione",
      "Donate via Rare Village": "Dona tramite Rare Village",
      "Contact Our Team": "Contatta il nostro team",
      "Open Facebook Group": "Apri il gruppo Facebook",
      "Open Columbia Registry": "Apri il registro Columbia",
      "Open LMNA Registry": "Apri il registro LMNA",
      "Download Wallet Card": "Scarica la carta portafoglio",
      "Download Family Tree Template": "Scarica il modello dell'albero genealogico",
      "Annual reports": "Rapporti annuali",
      "Financial reports": "Rapporti finanziari",
      "Governance and legal": "Governance e aspetti legali",
      "Board roster": "Composizione del consiglio",
      "Conflict policy": "Politica sui conflitti",
      "Tax and compliance details": "Dettagli fiscali e di conformità",
      "Pending": "In attesa",
      "Archive": "Archivio",
      "Coming soon": "In arrivo",
      "In review": "In revisione",
      "On file": "Agli atti",
      "Provide services and support you have requested": "Fornire servizi e supporto richiesti",
      "Improve our website and programs": "Migliorare il nostro sito e i nostri programmi",
      "Send updates and communications (with your consent)": "Inviare aggiornamenti e comunicazioni (con il tuo consenso)",
      "Comply with legal obligations": "Rispettare gli obblighi legali"
    }),
    zh: normalizeRecord({
      "cureEDMD.org | Home": "cureEDMD.org | 首页",
      "cureEDMD.org | Who We Are": "cureEDMD.org | 关于我们",
      "cureEDMD.org | What Is EDMD": "cureEDMD.org | 什么是 EDMD",
      "cureEDMD.org | Research": "cureEDMD.org | 研究",
      "cureEDMD.org | Resources": "cureEDMD.org | 资源",
      "cureEDMD.org | News and Updates": "cureEDMD.org | 新闻与更新",
      "cureEDMD.org | Help Change Lives": "cureEDMD.org | 帮助改变生命",
      "cureEDMD.org | Financial Transparency": "cureEDMD.org | 财务透明",
      "cureEDMD.org | Privacy": "cureEDMD.org | 隐私",
      "Skip to content": "跳到内容",
      "Loading latest cureEDMD updates...": "正在加载 cureEDMD 最新动态...",
      "Action for every family": "为每个家庭而行动",
      "Menu": "菜单",
      "Home": "首页",
      "Who We Are": "关于我们",
      "What Is EDMD": "什么是 EDMD",
      "Research": "研究",
      "Resources": "资源",
      "News": "新闻",
      "Help Change Lives": "帮助改变生命",
      "Donate": "捐赠",
      "Language": "语言",
      "Select language": "选择语言",
      "Primary navigation": "主导航",
      "Hero slide navigation": "主视觉幻灯导航",
      "Previous story": "上一则故事",
      "Next story": "下一则故事",
      "Working Together for cureEDMD": "携手支持 cureEDMD",
      "Quick Links": "快速链接",
      "Find Resources": "查找资源",
      "Learn About EDMD": "了解 EDMD",
      "Newly diagnosed?": "刚刚确诊？",
      "Start with simple, plain-language information about symptoms, genetics, and care planning.": "先从关于症状、遗传和护理规划的简明信息开始了解。",
      "Go to What Is EDMD": "前往“什么是 EDMD”",
      "Need practical tools?": "需要实用工具？",
      "Get links for patient registries, support communities, and download resources.": "获取患者登记、支持社区和可下载资源的链接。",
      "Go to Resources": "前往资源",
      "Want to help now?": "想立刻提供帮助？",
      "Donate, volunteer, and connect with the mission in ways that fit your capacity.": "通过捐赠、志愿服务等适合您的方式支持这项使命。",
      "Go to Help Change Lives": "前往“帮助改变生命”",
      "Latest": "最新",
      "Snapshot": "概览",
      "Impact": "影响",
      "Photos": "照片",
      "Stories": "故事",
      "Take Action": "立即行动",
      "Every donation counts": "每一笔捐赠都很重要",
      "Contributions help fund treatment-focused research and family support resources. If you cannot donate now, sharing resources and joining studies also helps.": "您的捐助将帮助资助以治疗为导向的研究和家庭支持资源。如果您暂时无法捐赠，分享资源和参与研究同样有帮助。",
      "Choose an amount (demo)": "选择金额（演示）",
      "Donate Now": "立即捐赠",
      "Volunteer and Partner": "志愿参与与合作",
      "Current image is a placeholder. Replace with cureEDMD family photography.": "当前图片为占位图，可替换为 cureEDMD 家庭的真实照片。",
      "Financial Transparency": "财务透明",
      "Privacy": "隐私",
      "Draft for cureEDMD.org | Not medical advice. For emergencies, contact local emergency services.": "cureEDMD.org 草稿 | 本内容不构成医疗建议。如遇紧急情况，请联系当地紧急救援服务。",
      "Email: info@cureEDMD.org": "电子邮箱：info@cureEDMD.org",
      "Mission": "使命",
      "Accomplishments": "成果",
      "Progress already made": "已取得的进展",
      "Founders": "创始人",
      "People behind the mission": "使命背后的人",
      "Genetics": "遗传",
      "Diagnosis and care": "诊断与护理",
      "Visual Guide": "可视化指南",
      "EDMD pathway": "EDMD 路径",
      "Partner Labs": "合作实验室",
      "Featured researchers": "重点研究人员",
      "Research roadmap": "研究路线图",
      "Study participation": "参与研究",
      "Downloads": "下载",
      "Helpful documents for appointments and emergencies": "就诊和紧急情况的实用文件",
      "One-page guide": "一页指南",
      "FAQ": "常见问题",
      "Why registries are important": "为什么登记很重要",
      "Suggested recurring posts": "建议定期发布的内容",
      "Update format": "更新格式",
      "Email updates": "邮件更新",
      "Accountability": "公开问责",
      "Published materials": "已发布资料",
      "What we plan to post": "我们计划发布的内容",
      "How to help": "如何提供帮助",
      "Need a document before it is posted?": "在发布前就需要文件吗？",
      "Contact": "联系",
      "Questions about transparency?": "对透明度有疑问？",
      "Privacy Statement": "隐私声明",
      "What information we collect": "我们收集哪些信息",
      "How we use your information": "我们如何使用您的信息",
      "Data security": "数据安全",
      "Your rights": "您的权利",
      "Third parties": "第三方",
      "Contact us": "联系我们",
      "Last updated: 2026": "最后更新：2026",
      "Send requests for records or corrections to info@cureEDMD.org.": "如需记录或更正，请发送邮件至 info@cureEDMD.org。",
      "Request documents": "申请文件",
      "Support the mission": "支持这项使命",
      "Donate via Rare Village": "通过 Rare Village 捐赠",
      "Contact Our Team": "联系我们的团队",
      "Open Facebook Group": "打开 Facebook 群组",
      "Open Columbia Registry": "打开 Columbia 登记",
      "Open LMNA Registry": "打开 LMNA 登记",
      "Download Wallet Card": "下载随身卡",
      "Download Family Tree Template": "下载家谱模板",
      "Annual reports": "年度报告",
      "Financial reports": "财务报告",
      "Governance and legal": "治理与法律",
      "Board roster": "董事会名单",
      "Conflict policy": "利益冲突政策",
      "Tax and compliance details": "税务与合规详情",
      "Pending": "待定",
      "Archive": "档案",
      "Coming soon": "即将推出",
      "In review": "审核中",
      "On file": "已存档",
      "Provide services and support you have requested": "提供您所请求的服务与支持",
      "Improve our website and programs": "改进我们的网站和项目",
      "Send updates and communications (with your consent)": "发送更新和沟通信息（经您同意）",
      "Comply with legal obligations": "遵守法律义务"
    }),
    ja: normalizeRecord({
      "cureEDMD.org | Home": "cureEDMD.org | ホーム",
      "cureEDMD.org | Who We Are": "cureEDMD.org | 私たちについて",
      "cureEDMD.org | What Is EDMD": "cureEDMD.org | EDMDとは",
      "cureEDMD.org | Research": "cureEDMD.org | 研究",
      "cureEDMD.org | Resources": "cureEDMD.org | リソース",
      "cureEDMD.org | News and Updates": "cureEDMD.org | ニュースと更新情報",
      "cureEDMD.org | Help Change Lives": "cureEDMD.org | 命を変える支援",
      "cureEDMD.org | Financial Transparency": "cureEDMD.org | 財務の透明性",
      "cureEDMD.org | Privacy": "cureEDMD.org | プライバシー",
      "Skip to content": "本文へ移動",
      "Loading latest cureEDMD updates...": "cureEDMD の最新情報を読み込み中...",
      "Action for every family": "すべての家族のための行動",
      "Menu": "メニュー",
      "Home": "ホーム",
      "Who We Are": "私たちについて",
      "What Is EDMD": "EDMDとは",
      "Research": "研究",
      "Resources": "リソース",
      "News": "ニュース",
      "Help Change Lives": "命を変える支援",
      "Donate": "寄付する",
      "Language": "言語",
      "Select language": "言語を選択",
      "Primary navigation": "メインナビゲーション",
      "Hero slide navigation": "メインスライドのナビゲーション",
      "Previous story": "前のストーリー",
      "Next story": "次のストーリー",
      "Working Together for cureEDMD": "cureEDMDのために力を合わせて",
      "Quick Links": "クイックリンク",
      "Find Resources": "リソースを探す",
      "Learn About EDMD": "EDMDについて知る",
      "Newly diagnosed?": "診断されたばかりですか？",
      "Start with simple, plain-language information about symptoms, genetics, and care planning.": "症状、遺伝、ケア計画について、わかりやすい基本情報から始めましょう。",
      "Go to What Is EDMD": "「EDMDとは」へ",
      "Need practical tools?": "実用的な情報が必要ですか？",
      "Get links for patient registries, support communities, and download resources.": "患者登録、支援コミュニティ、ダウンロード資料へのリンクを確認できます。",
      "Go to Resources": "リソースへ",
      "Want to help now?": "今すぐ支援したいですか？",
      "Donate, volunteer, and connect with the mission in ways that fit your capacity.": "寄付やボランティアなど、ご自身に合った形でこの使命を支えてください。",
      "Go to Help Change Lives": "「命を変える支援」へ",
      "Latest": "最新情報",
      "Snapshot": "概要",
      "Impact": "インパクト",
      "Photos": "写真",
      "Stories": "ストーリー",
      "Take Action": "行動する",
      "Every donation counts": "すべての寄付が力になります",
      "Contributions help fund treatment-focused research and family support resources. If you cannot donate now, sharing resources and joining studies also helps.": "ご寄付は、治療に焦点を当てた研究や家族向け支援リソースの資金になります。今すぐ寄付できなくても、情報共有や研究参加も大きな助けになります。",
      "Choose an amount (demo)": "金額を選ぶ（デモ）",
      "Donate Now": "今すぐ寄付",
      "Volunteer and Partner": "ボランティア・連携",
      "Current image is a placeholder. Replace with cureEDMD family photography.": "現在の画像は仮のものです。cureEDMD の家族写真に差し替えてください。",
      "Financial Transparency": "財務の透明性",
      "Privacy": "プライバシー",
      "Draft for cureEDMD.org | Not medical advice. For emergencies, contact local emergency services.": "cureEDMD.org の草案 | 医療アドバイスではありません。緊急時は地域の緊急サービスに連絡してください。",
      "Email: info@cureEDMD.org": "メール：info@cureEDMD.org",
      "Mission": "ミッション",
      "Accomplishments": "実績",
      "Progress already made": "これまでの進展",
      "Founders": "創設者",
      "People behind the mission": "この使命を支える人たち",
      "Genetics": "遺伝",
      "Diagnosis and care": "診断とケア",
      "Visual Guide": "ビジュアルガイド",
      "EDMD pathway": "EDMDの流れ",
      "Partner Labs": "協力研究室",
      "Featured researchers": "注目の研究者",
      "Research roadmap": "研究ロードマップ",
      "Study participation": "研究参加",
      "Downloads": "ダウンロード",
      "Helpful documents for appointments and emergencies": "受診や緊急時に役立つ資料",
      "One-page guide": "1ページガイド",
      "FAQ": "よくある質問",
      "Why registries are important": "患者登録が重要な理由",
      "Suggested recurring posts": "定期的に掲載したい投稿",
      "Update format": "更新形式",
      "Email updates": "メール更新",
      "Accountability": "説明責任",
      "Published materials": "公開資料",
      "What we plan to post": "今後掲載予定の内容",
      "How to help": "支援の方法",
      "Need a document before it is posted?": "掲載前に資料が必要ですか？",
      "Contact": "連絡先",
      "Questions about transparency?": "透明性について質問がありますか？",
      "Privacy Statement": "プライバシー声明",
      "What information we collect": "収集する情報",
      "How we use your information": "情報の利用方法",
      "Data security": "データセキュリティ",
      "Your rights": "あなたの権利",
      "Third parties": "第三者",
      "Contact us": "お問い合わせ",
      "Last updated: 2026": "最終更新：2026年",
      "Send requests for records or corrections to info@cureEDMD.org.": "記録の請求や修正依頼は info@cureEDMD.org までお送りください。",
      "Request documents": "資料を請求する",
      "Support the mission": "この使命を支える",
      "Donate via Rare Village": "Rare Village 経由で寄付する",
      "Contact Our Team": "私たちのチームに連絡する",
      "Open Facebook Group": "Facebook グループを開く",
      "Open Columbia Registry": "Columbia レジストリを開く",
      "Open LMNA Registry": "LMNA レジストリを開く",
      "Download Wallet Card": "ウォレットカードをダウンロード",
      "Download Family Tree Template": "家系図テンプレートをダウンロード",
      "Annual reports": "年次報告書",
      "Financial reports": "財務報告",
      "Governance and legal": "ガバナンスと法務",
      "Board roster": "理事会名簿",
      "Conflict policy": "利益相反ポリシー",
      "Tax and compliance details": "税務・コンプライアンス情報",
      "Pending": "保留中",
      "Archive": "アーカイブ",
      "Coming soon": "近日公開",
      "In review": "確認中",
      "On file": "記録済み",
      "Provide services and support you have requested": "ご希望のサービスと支援を提供する",
      "Improve our website and programs": "ウェブサイトと活動を改善する",
      "Send updates and communications (with your consent)": "更新情報や連絡を送る（同意がある場合）",
      "Comply with legal obligations": "法的義務を順守する"
    }),
    ko: normalizeRecord({
      "cureEDMD.org | Home": "cureEDMD.org | 홈",
      "cureEDMD.org | Who We Are": "cureEDMD.org | 우리 소개",
      "cureEDMD.org | What Is EDMD": "cureEDMD.org | EDMD란 무엇인가",
      "cureEDMD.org | Research": "cureEDMD.org | 연구",
      "cureEDMD.org | Resources": "cureEDMD.org | 자료",
      "cureEDMD.org | News and Updates": "cureEDMD.org | 뉴스와 업데이트",
      "cureEDMD.org | Help Change Lives": "cureEDMD.org | 삶을 바꾸는 도움",
      "cureEDMD.org | Financial Transparency": "cureEDMD.org | 재정 투명성",
      "cureEDMD.org | Privacy": "cureEDMD.org | 개인정보",
      "Skip to content": "본문으로 건너뛰기",
      "Loading latest cureEDMD updates...": "cureEDMD 최신 소식을 불러오는 중...",
      "Action for every family": "모든 가족을 위한 행동",
      "Menu": "메뉴",
      "Home": "홈",
      "Who We Are": "우리 소개",
      "What Is EDMD": "EDMD란 무엇인가",
      "Research": "연구",
      "Resources": "자료",
      "News": "뉴스",
      "Help Change Lives": "삶을 바꾸는 도움",
      "Donate": "기부하기",
      "Language": "언어",
      "Select language": "언어 선택",
      "Primary navigation": "기본 탐색",
      "Hero slide navigation": "메인 슬라이드 탐색",
      "Previous story": "이전 이야기",
      "Next story": "다음 이야기",
      "Working Together for cureEDMD": "cureEDMD를 위해 함께합니다",
      "Quick Links": "빠른 링크",
      "Find Resources": "자료 찾기",
      "Learn About EDMD": "EDMD 알아보기",
      "Newly diagnosed?": "최근 진단을 받으셨나요?",
      "Start with simple, plain-language information about symptoms, genetics, and care planning.": "증상, 유전, 돌봄 계획에 대한 쉬운 설명부터 시작해 보세요.",
      "Go to What Is EDMD": "“EDMD란 무엇인가”로 이동",
      "Need practical tools?": "실용적인 도움이 필요하신가요?",
      "Get links for patient registries, support communities, and download resources.": "환자 등록, 지원 커뮤니티, 다운로드 자료 링크를 확인할 수 있습니다.",
      "Go to Resources": "자료로 이동",
      "Want to help now?": "지금 바로 돕고 싶으신가요?",
      "Donate, volunteer, and connect with the mission in ways that fit your capacity.": "기부, 자원봉사 등 자신의 상황에 맞는 방식으로 이 사명을 함께해 주세요.",
      "Go to Help Change Lives": "“삶을 바꾸는 도움”으로 이동",
      "Latest": "최신",
      "Snapshot": "개요",
      "Impact": "영향",
      "Photos": "사진",
      "Stories": "이야기",
      "Take Action": "행동하기",
      "Every donation counts": "모든 기부가 소중합니다",
      "Contributions help fund treatment-focused research and family support resources. If you cannot donate now, sharing resources and joining studies also helps.": "기부금은 치료 중심 연구와 가족 지원 자료를 마련하는 데 도움이 됩니다. 지금 기부가 어렵더라도 자료를 공유하고 연구에 참여하는 것 역시 큰 도움이 됩니다.",
      "Choose an amount (demo)": "금액 선택(데모)",
      "Donate Now": "지금 기부하기",
      "Volunteer and Partner": "자원봉사 및 협력",
      "Current image is a placeholder. Replace with cureEDMD family photography.": "현재 이미지는 자리표시자입니다. cureEDMD 가족의 실제 사진으로 바꿔 주세요.",
      "Financial Transparency": "재정 투명성",
      "Privacy": "개인정보",
      "Draft for cureEDMD.org | Not medical advice. For emergencies, contact local emergency services.": "cureEDMD.org 초안 | 의료 조언이 아닙니다. 응급 상황에서는 지역 응급 서비스에 연락하세요.",
      "Email: info@cureEDMD.org": "이메일: info@cureEDMD.org",
      "Mission": "사명",
      "Accomplishments": "성과",
      "Progress already made": "이미 이루어진 진전",
      "Founders": "창립자",
      "People behind the mission": "이 사명을 이루는 사람들",
      "Genetics": "유전",
      "Diagnosis and care": "진단과 관리",
      "Visual Guide": "시각 가이드",
      "EDMD pathway": "EDMD 경로",
      "Partner Labs": "협력 연구실",
      "Featured researchers": "주요 연구자",
      "Research roadmap": "연구 로드맵",
      "Study participation": "연구 참여",
      "Downloads": "다운로드",
      "Helpful documents for appointments and emergencies": "진료와 응급 상황에 도움이 되는 문서",
      "One-page guide": "한 페이지 가이드",
      "FAQ": "자주 묻는 질문",
      "Why registries are important": "환자 등록이 중요한 이유",
      "Suggested recurring posts": "정기적으로 올릴 게시물 제안",
      "Update format": "업데이트 형식",
      "Email updates": "이메일 업데이트",
      "Accountability": "책임과 공개",
      "Published materials": "공개 자료",
      "What we plan to post": "게시 예정 자료",
      "How to help": "도움이 되는 방법",
      "Need a document before it is posted?": "게시 전에 문서가 필요하신가요?",
      "Contact": "문의",
      "Questions about transparency?": "투명성에 대해 궁금하신가요?",
      "Privacy Statement": "개인정보 보호정책",
      "What information we collect": "수집하는 정보",
      "How we use your information": "정보 사용 방식",
      "Data security": "데이터 보안",
      "Your rights": "귀하의 권리",
      "Third parties": "제3자",
      "Contact us": "문의하기",
      "Last updated: 2026": "최종 업데이트: 2026",
      "Send requests for records or corrections to info@cureEDMD.org.": "기록 요청이나 정정 요청은 info@cureEDMD.org 로 보내 주세요.",
      "Request documents": "문서 요청",
      "Support the mission": "이 사명 지원하기",
      "Donate via Rare Village": "Rare Village를 통해 기부하기",
      "Contact Our Team": "팀에 문의하기",
      "Open Facebook Group": "Facebook 그룹 열기",
      "Open Columbia Registry": "Columbia 등록 열기",
      "Open LMNA Registry": "LMNA 등록 열기",
      "Download Wallet Card": "지갑 카드 다운로드",
      "Download Family Tree Template": "가계도 템플릿 다운로드",
      "Annual reports": "연차 보고서",
      "Financial reports": "재무 보고서",
      "Governance and legal": "거버넌스 및 법률",
      "Board roster": "이사회 명단",
      "Conflict policy": "이해상충 정책",
      "Tax and compliance details": "세무 및 규정 준수 정보",
      "Pending": "예정",
      "Archive": "자료실",
      "Coming soon": "곧 공개",
      "In review": "검토 중",
      "On file": "기록 보관",
      "Provide services and support you have requested": "요청하신 서비스와 지원 제공",
      "Improve our website and programs": "웹사이트와 프로그램 개선",
      "Send updates and communications (with your consent)": "업데이트와 소식 전달(동의 시)",
      "Comply with legal obligations": "법적 의무 준수"
    })
  });

  Object.assign(catalog.richHtml, {
    de: {
      "transparency-request":
        'Schreiben Sie an <a href="mailto:info@cureEDMD.org">info@cureEDMD.org</a>, und wir senden Ihnen die neueste freigegebene Version oder teilen Ihnen mit, wann sie verfügbar sein wird.'
    },
    it: {
      "transparency-request":
        'Scrivi a <a href="mailto:info@cureEDMD.org">info@cureEDMD.org</a> e condivideremo la versione approvata più recente oppure ti diremo quando sarà disponibile.'
    },
    zh: {
      "transparency-request":
        '请发送邮件至 <a href="mailto:info@cureEDMD.org">info@cureEDMD.org</a>，我们会分享最新获批版本，或告知您何时可以提供。'
    },
    ja: {
      "transparency-request":
        '<a href="mailto:info@cureEDMD.org">info@cureEDMD.org</a> までメールでご連絡いただければ、最新の承認済み版を共有するか、いつ利用可能になるかをお知らせします。'
    },
    ko: {
      "transparency-request":
        '<a href="mailto:info@cureEDMD.org">info@cureEDMD.org</a> 로 이메일을 보내 주시면 최신 승인본을 공유하거나 언제 제공 가능한지 알려 드리겠습니다.'
    }
  });

  Object.assign(catalog.dynamic, {
    de: {
      railMessages: [
        "Neueste Updates: Monatliche Beiträge zum Fortschritt der Gemeinschaft sind geplant",
        "Aktive Registerkampagne für berechtigte EDMD-Familien",
        "Updates der Forschungspartner und Meilensteine erscheinen vierteljährlich"
      ],
      slideButtonLabel: "Folie {n} anzeigen",
      heroSlides: [
        {
          title: "EDMD gemeinsam heilen",
          text: "Von Familien geführt. Wissenschaftlich unterstützt. Fokussiert auf Versorgung heute und Behandlungen für morgen.",
          image: "https://images.unsplash.com/photo-1530023367847-a683933f4172?auto=format&fit=crop&w=1100&q=80",
          alt: "Familie spaziert gemeinsam im Freien"
        },
        {
          title: "Klare Orientierung",
          text: "Verständliche Informationen, praktische Werkzeuge und nächste Schritte für Versorgung und Forschung.",
          image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=1100&q=80",
          alt: "Menschen arbeiten gemeinsam an einem Tisch"
        },
        {
          title: "Fortschritt in der Forschung",
          text: "Register, Verlaufstudien und Partnerschaften helfen bei der Vorbereitung künftiger EDMD-Studien.",
          image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1100&q=80",
          alt: "Kliniker spricht mit einer Familie"
        }
      ],
      milestones: [
        {
          year: "2024",
          title: "Herzüberwachung stärker betont",
          body: "Die Aufklärung in der Gemeinschaft betonte routinemäßige Kontrollen per EKG, Holter und Echokardiogramm, da das Herzrisiko für die EDMD-Versorgung zentral ist."
        },
        {
          year: "2025",
          title: "Ausbau der Registeransprache",
          body: "Botschaften an Patienten und Betreuungspersonen erklärten stärker, warum Registeranmeldungen die Entwicklung von Behandlungen bei seltenen Erkrankungen unterstützen."
        },
        {
          year: "2026",
          title: "Kommunikation mit Forschungspartnern aktualisiert",
          body: "Hervorgehobene Forschungsgeschichten wurden in klarer Sprache überarbeitet, damit Familien Behandlungswege besser verstehen."
        },
        {
          year: "2027",
          title: "Fokus auf Studienvorbereitung",
          body: "Geplant ist ein Schwerpunkt auf natürlicher Krankheitsgeschichte, Datenqualität und Patientenaufklärung zur Vorbereitung künftiger Studien."
        }
      ],
      stories: [
        {
          quote: "Als uns jemand EDMD in klarer Sprache erklärte, fühlten wir uns weniger überfordert und eher bereit zu handeln.",
          byline: "Betreuendes Elternteil"
        },
        {
          quote: "Ich brauchte Ressourcen für das Erwachsenenleben, nicht nur für die Versorgung in der Kindheit. Der Austausch mit anderen hat diese Lücke geschlossen.",
          byline: "Erwachsene Person mit EDMD"
        },
        {
          quote: "Familien stellen zu Beginn immer wieder dieselben Fragen. Ein einfacher Leitfaden zu Diagnose und Registern hilft sofort weiter.",
          byline: "Koordinatorin einer neuromuskulären Klinik"
        }
      ],
      donationMessages: {
        low: "{amount} kann helfen, ein praktisches Informationsblatt für Familien zu veröffentlichen.",
        medium: "{amount} kann einen Aufklärungs- und Registeransprache-Zyklus für Familien unterstützen.",
        high: "{amount} kann Gemeinschafts-Webinare und Unterstützung bei Registeranmeldungen ermöglichen."
      }
    },
    it: {
      railMessages: [
        "Ultimi aggiornamenti: sono previsti post mensili sui progressi della comunità",
        "Campagna attiva per la partecipazione ai registri delle famiglie EDMD idonee",
        "Aggiornamenti dei partner di ricerca e traguardi pubblicati ogni trimestre"
      ],
      slideButtonLabel: "Mostra diapositiva {n}",
      heroSlides: [
        {
          title: "Curare la EDMD insieme",
          text: "Guidato dalle famiglie. Sostenuto dalla scienza. Concentrato sulle cure di oggi e sui trattamenti di domani.",
          image: "https://images.unsplash.com/photo-1530023367847-a683933f4172?auto=format&fit=crop&w=1100&q=80",
          alt: "Famiglia che cammina insieme all'aperto"
        },
        {
          title: "Indicazioni chiare",
          text: "Educazione in linguaggio semplice, strumenti pratici e prossimi passi per cure e ricerca.",
          image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=1100&q=80",
          alt: "Persone che collaborano attorno a un tavolo"
        },
        {
          title: "Progressi della ricerca",
          text: "Registri, studi di follow-up e partnership aiutano a preparare i futuri studi sulla EDMD.",
          image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1100&q=80",
          alt: "Un medico parla con una famiglia"
        }
      ],
      milestones: [
        {
          year: "2024",
          title: "Maggiore attenzione al monitoraggio cardiaco",
          body: "L'educazione della comunità ha rafforzato il monitoraggio routinario con ECG, Holter ed ecocardiogramma perché il rischio cardiaco è centrale nella cura della EDMD."
        },
        {
          year: "2025",
          title: "Espansione della sensibilizzazione ai registri",
          body: "La comunicazione verso pazienti e caregiver si è concentrata maggiormente sul perché l'iscrizione ai registri aiuti lo sviluppo dei trattamenti nelle malattie rare."
        },
        {
          year: "2026",
          title: "Aggiornata la comunicazione con i partner di ricerca",
          body: "Le storie di ricerca in evidenza sono state riscritte in linguaggio chiaro per aiutare le famiglie a comprendere i percorsi terapeutici."
        },
        {
          year: "2027",
          title: "Focus sulla preparazione agli studi",
          body: "È previsto un focus su storia naturale, qualità dei dati ed educazione dei pazienti per preparare gli studi futuri."
        }
      ],
      stories: [
        {
          quote: "Quando qualcuno ci ha spiegato la EDMD in modo chiaro, ci siamo sentiti meno sopraffatti e più pronti ad agire.",
          byline: "Genitore caregiver"
        },
        {
          quote: "Avevo bisogno di risorse per la vita adulta, non solo per l'assistenza nell'infanzia. Il supporto tra pari ha colmato quel vuoto.",
          byline: "Adulto che vive con la EDMD"
        },
        {
          quote: "Le famiglie fanno sempre le stesse domande all'inizio. Una guida semplice su diagnosi e registri aiuta subito.",
          byline: "Coordinatrice di clinica neuromuscolare"
        }
      ],
      donationMessages: {
        low: "{amount} può aiutare a pubblicare una scheda pratica di risorse per le famiglie.",
        medium: "{amount} può sostenere un ciclo di educazione per le famiglie e di sensibilizzazione ai registri.",
        high: "{amount} può sostenere webinar della comunità e supporto all'iscrizione ai registri."
      }
    },
    zh: {
      railMessages: [
        "最新动态：计划每月发布一次社区进展更新",
        "面向符合条件的 EDMD 家庭的登记参与推广正在进行中",
        "研究合作伙伴更新和里程碑将按季度发布"
      ],
      slideButtonLabel: "显示第 {n} 张幻灯片",
      heroSlides: [
        {
          title: "携手治愈 EDMD",
          text: "由家庭推动，由科学支持，关注当下护理与未来治疗。",
          image: "https://images.unsplash.com/photo-1530023367847-a683933f4172?auto=format&fit=crop&w=1100&q=80",
          alt: "一家人在户外一起散步"
        },
        {
          title: "清晰指引",
          text: "用通俗语言提供教育内容、实用工具以及护理和研究的下一步。",
          image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=1100&q=80",
          alt: "一群人围坐在桌边合作"
        },
        {
          title: "研究进展",
          text: "患者登记、随访研究和合作伙伴关系有助于未来 EDMD 试验的准备。",
          image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1100&q=80",
          alt: "临床医生与一个家庭交谈"
        }
      ],
      milestones: [
        {
          year: "2024",
          title: "进一步强调心脏监测指导",
          body: "社区教育强化了 ECG、Holter 和超声心动图的常规监测，因为心脏风险是 EDMD 护理中的核心问题。"
        },
        {
          year: "2025",
          title: "扩大登记推广",
          body: "面向患者和照护者的信息更加集中说明，为什么加入登记有助于罕见病治疗开发。"
        },
        {
          year: "2026",
          title: "更新研究合作伙伴沟通内容",
          body: "重点研究故事以更清晰的语言进行了更新，帮助家庭理解治疗路径。"
        },
        {
          year: "2027",
          title: "聚焦试验准备",
          body: "计划重点关注自然病程、数据质量和患者教育，以支持未来研究的准备工作。"
        }
      ],
      stories: [
        {
          quote: "当有人用简单清楚的语言解释 EDMD 时，我们不再那么不知所措，也更愿意采取行动。",
          byline: "患者家长/照护者"
        },
        {
          quote: "我需要的是成年后的生活资源，而不仅仅是儿童时期的照护信息。同伴支持填补了这个空白。",
          byline: "患有 EDMD 的成年人"
        },
        {
          quote: "家庭在最初总会提出类似的问题。一份简单的诊断和登记说明马上就能帮上忙。",
          byline: "神经肌肉门诊协调员"
        }
      ],
      donationMessages: {
        low: "{amount} 可以帮助发布一份实用的家庭资源单页。",
        medium: "{amount} 可以支持一次面向家庭的教育与登记推广周期。",
        high: "{amount} 可以支持社区网络讲座和登记参与协助。"
      }
    },
    ja: {
      railMessages: [
        "最新情報：コミュニティの進捗を伝える月次投稿を予定しています",
        "対象となる EDMD 家族向けの患者登録参加キャンペーンを実施中です",
        "研究パートナーの更新情報と節目は四半期ごとに掲載されます"
      ],
      slideButtonLabel: "{n} 枚目のスライドを表示",
      heroSlides: [
        {
          title: "EDMDをともに治すために",
          text: "家族が主導し、科学が支え、今必要なケアと将来の治療に焦点を当てています。",
          image: "https://images.unsplash.com/photo-1530023367847-a683933f4172?auto=format&fit=crop&w=1100&q=80",
          alt: "屋外を一緒に歩く家族"
        },
        {
          title: "わかりやすい案内",
          text: "やさしい言葉による説明、実用的なツール、ケアと研究の次の一歩を提供します。",
          image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=1100&q=80",
          alt: "テーブルを囲んで協力する人々"
        },
        {
          title: "研究の前進",
          text: "患者登録、追跡研究、パートナーシップが将来の EDMD 試験準備に役立ちます。",
          image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1100&q=80",
          alt: "家族と話す臨床医"
        }
      ],
      milestones: [
        {
          year: "2024",
          title: "心臓モニタリングの重要性をさらに強調",
          body: "心臓リスクが EDMD のケアで重要であるため、ECG、ホルター、心エコーによる定期的な確認の大切さをコミュニティ向けに強調しました。"
        },
        {
          year: "2025",
          title: "患者登録への呼びかけを拡大",
          body: "患者や介護者向けの情報発信では、患者登録が希少疾患の治療開発にどう役立つかをより明確に伝えました。"
        },
        {
          year: "2026",
          title: "研究パートナーとの情報発信を更新",
          body: "注目している研究ストーリーをやさしい言葉で書き直し、家族が治療の道筋を理解しやすくしました。"
        },
        {
          year: "2027",
          title: "試験準備への重点化",
          body: "今後の研究に向けて、自然経過データ、データ品質、患者教育を重視した準備を進める予定です。"
        }
      ],
      stories: [
        {
          quote: "EDMD をわかりやすく説明してもらえたとき、圧倒される気持ちが少なくなり、行動に移しやすくなりました。",
          byline: "親の介護者"
        },
        {
          quote: "子どもの頃のケアだけでなく、大人になってからの生活に役立つ情報が必要でした。仲間からの支えがその空白を埋めてくれました。",
          byline: "EDMD とともに生きる成人"
        },
        {
          quote: "家族は最初に同じような質問をします。診断と患者登録を簡単に説明するガイドがあれば、すぐに役立ちます。",
          byline: "神経筋クリニックのコーディネーター"
        }
      ],
      donationMessages: {
        low: "{amount} で、家族向けの実用的な情報シートを1枚公開できます。",
        medium: "{amount} で、家族向け教育と患者登録案内の1サイクルを支援できます。",
        high: "{amount} で、コミュニティ向けウェビナーや患者登録支援を支えることができます。"
      }
    },
    ko: {
      railMessages: [
        "최신 소식: 커뮤니티 진행 상황을 전하는 월간 게시물이 준비되고 있습니다",
        "대상 EDMD 가족을 위한 환자 등록 참여 캠페인이 진행 중입니다",
        "연구 파트너 업데이트와 주요 이정표는 분기별로 게시됩니다"
      ],
      slideButtonLabel: "{n}번 슬라이드 보기",
      heroSlides: [
        {
          title: "함께 EDMD를 치료해 나가요",
          text: "가족이 이끌고, 과학이 뒷받침하며, 지금 필요한 돌봄과 미래의 치료를 함께 바라봅니다.",
          image: "https://images.unsplash.com/photo-1530023367847-a683933f4172?auto=format&fit=crop&w=1100&q=80",
          alt: "야외에서 함께 걷는 가족"
        },
        {
          title: "명확한 안내",
          text: "쉬운 설명, 실용적인 도구, 돌봄과 연구를 위한 다음 단계를 제공합니다.",
          image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=1100&q=80",
          alt: "테이블에 둘러앉아 협력하는 사람들"
        },
        {
          title: "연구의 진전",
          text: "환자 등록, 추적 연구, 파트너십은 앞으로의 EDMD 연구 준비를 돕습니다.",
          image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1100&q=80",
          alt: "가족과 이야기하는 임상의"
        }
      ],
      milestones: [
        {
          year: "2024",
          title: "심장 모니터링 지침을 더욱 강조",
          body: "심장 위험이 EDMD 돌봄에서 매우 중요하기 때문에 ECG, 홀터, 심초음파의 정기적인 추적 검사가 필요하다는 점을 커뮤니티 교육에서 강조했습니다."
        },
        {
          year: "2025",
          title: "환자 등록 안내 확대",
          body: "환자와 보호자를 위한 안내에서는 환자 등록이 희귀질환 치료 개발에 왜 중요한지 더 분명하게 설명했습니다."
        },
        {
          year: "2026",
          title: "연구 파트너 소통 내용 업데이트",
          body: "주요 연구 이야기를 더 쉬운 언어로 정리해 가족들이 치료 경로를 이해하기 쉽게 만들었습니다."
        },
        {
          year: "2027",
          title: "연구 준비에 집중",
          body: "향후 연구를 위해 자연경과 자료, 데이터 품질, 환자 교육에 중점을 두는 준비를 계획하고 있습니다."
        }
      ],
      stories: [
        {
          quote: "누군가 EDMD를 쉬운 말로 설명해 주었을 때, 훨씬 덜 막막했고 무엇을 해야 할지 더 잘 알 수 있었습니다.",
          byline: "부모 보호자"
        },
        {
          quote: "어린 시절 돌봄뿐 아니라 성인기의 삶에 필요한 자료가 필요했습니다. 동료 지원이 그 빈틈을 채워 주었습니다.",
          byline: "EDMD와 함께 살아가는 성인"
        },
        {
          quote: "가족들은 처음에 비슷한 질문을 합니다. 진단과 환자 등록을 쉽게 설명한 안내서가 바로 도움이 됩니다.",
          byline: "신경근 클리닉 코디네이터"
        }
      ],
      donationMessages: {
        low: "{amount} 은 가족을 위한 실용적인 자료 한 장을 발행하는 데 도움을 줄 수 있습니다.",
        medium: "{amount} 은 가족 대상 교육과 환자 등록 안내 한 주기를 지원할 수 있습니다.",
        high: "{amount} 은 커뮤니티 웨비나와 환자 등록 지원을 도울 수 있습니다."
      }
    }
  });
})();
