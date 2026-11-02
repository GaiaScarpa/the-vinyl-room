const KEY = 'vinyl-room-v1';

const demo = [
  {
    id: 'session-1',
    speaker: 'LaunchLab Team',
    company: 'LaunchLab',
    title: 'Vibe Coding: From Idea to Website',
    date: '2026-10-09',
    category: 'Innovation',
    color: 'coral',

    notes: `The session introduced us to vibe coding, an approach to software development that uses AI to transform natural-language instructions into products. We explored several tools:

1. Claude Design and Claude Code

2. The importance of prompt engineering: The more specific the instructions, the more likely AI is to generate a result aligned with your expectations.

3. GitHub: store, manage, and collaborate on projects.

4. Vercel: connects to GitHub and transforms a project into a publicly accessible website.`,

    takeaways: `1. Coding is becoming more accessible
2. Prompting is a skill, not just an instruction
3. Creativity and technology complement each other
4. Building a website involves more than design
5. Learning by doing makes the difference`,

    reflection: `This session was particularly meaningful because it challenged my perception of what I could create without a technical background. Coming from a marketing and management background, I have always been more interested in the creative and strategic sides of digital projects than in coding itself. However, discovering how AI-powered tools can bridge the gap between an idea and its execution made me realise that technical knowledge is no longer the only factor determining what we can build. The most exciting part was having the opportunity to apply what we learned to a real project. Creating The Vinyl Room allowed me to combine my interest in creativity, design and storytelling with technologies I had never used before. Of course, the process wasn’t entirely straightforward. Moving between different platforms, understanding GitHub and deploying the website through Vercel required patience and experimentation. But that was probably the most valuable part of the experience. My biggest takeaway is that AI doesn’t replace creativity; it gives us new ways to express it. As someone interested in branding and digital marketing, I see enormous potential in using these tools to prototype ideas, create interactive brand experiences and bring creative concepts to life more independently.`
  },

  {
    id: 'session-2',
    speaker: 'Nick Goh',
    company: 'Yellow Pages Singapore',
    title: 'Building an AI Marketing Team',
    date: '2026-10-30',
    category: 'Marketing',
    color: 'blue',

    notes: `Nick Goh introduced us to the concept of agentic AI workflows and demonstrated how artificial intelligence can support the different stages of marketing campaign development.

The workflow was demonstrated through Claude, using a fictional Louis Vuitton campaign as a practical example.

1. Structuring an AI marketing team:

The Planning Team

• Brief Writer: Develops the initial marketing brief based on project information, including objectives, target audience, budget, and timing.
• Brief Validator: Reviews the brief, identifies weaknesses, and checks whether the objectives, audience, message, and metrics are clearly defined.
• Strategist: Analyses the validated brief and develops the campaign’s central creative idea.

The Production Team

• Designer / Art Director: Develops key visuals and creative concepts aligned with the campaign strategy.
• Copywriter: Creates the messaging hierarchy and adapts copy for different marketing channels.
• Reviewer: Evaluates the final outputs to ensure consistency with the brief, brand identity, and campaign objectives.

2. The workflow included a human approval stage between planning and production: Brief Writer → Brief Validator → Strategist → Human Approval → Designer & Copywriter → Reviewer.

3. Creating and Refining Marketing Briefs: The process involved defining the campaign’s objectives, identifying the target audience, establishing the key message and clarifying the expected outcomes.

4. Developing research insights and transforming them into a coherent campaign strategy: AI was used to support research, identify potential positioning opportunities and structure the messaging hierarchy.

5. The workflow moved from research and messaging to the creation of key visuals and campaign copy.

6. The final stage involved reviewing the campaign materials to ensure they reflected the intended brand voice and creative concept.`,

    takeaways: `1. AI works better when responsabilities are clearly defined
2. Strategy must come before execution
3. Human judgment remains essential
4. AI can support the entire marketing process
5. Brand consistency cannot be overlooked`,

    reflection: `What I found most interesting about this session was the shift from thinking about AI as a tool to understanding it as part of an entire marketing workflow. Before this session, I mainly associated generative AI with individual tasks such as brainstorming, writing content, or generating visuals. Seeing how different AI agents could collaborate across the entire campaign development process made me reconsider how marketing teams might operate in the future. The Louis Vuitton example was particularly relevant: it showed how AI can support the development of a campaign from the initial brief to the final creative execution. However, it also raised an important question for me: If AI can generate increasingly sophisticated creative content, what will truly differentiate one brand from another? I believe the answer lies in strategic thinking, originality and a deep understanding of consumers. AI can accelerate the creative process, but it cannot automatically guarantee that an idea is meaningful, distinctive, or relevant to a brand’s audience. Another aspect I appreciated was the importance given to human approval within the workflow. To me, this reinforces the idea that the future of marketing is not necessarily about replacing people with AI, but about learning how to combine human expertise with technological capabilities. My biggest takeaway is that the real competitive advantage won’t come simply from using AI, but from knowing how to direct it strategically and creatively. As I continue developing my skills in marketing and branding, I see this as an increasingly important capability for future marketing professionals.`
  }
];

// Load saved records, if available.
// Merge published sessions with any personal records saved in the browser.
let state;

try {
  state = JSON.parse(localStorage.getItem(KEY));
} catch {}

if (
  !state ||
  !Array.isArray(state.records) ||
  !Array.isArray(state.reflections)
) {
  state = {
    records: [...demo],
    reflections: []
  };
} else {
  const publishedIds = new Set(demo.map(r => r.id));

  state.records = [
    ...demo,
    ...state.records.filter(r => !publishedIds.has(r.id))
  ];
}

const $ = s => document.querySelector(s);

const esc = s =>
  String(s ?? '').replace(/[&<>"']/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[c]));

const persist = () => {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
    toast('Saved in this browser ✓');
  } catch {
    toast('Storage unavailable — export a backup');
  }
};

function toast(message) {
  const el = $('#toast');
  el.textContent = message;
  el.classList.add('show');

  clearTimeout(window.toastTimer);

  window.toastTimer = setTimeout(
    () => el.classList.remove('show'),
    2400
  );
}

function renderRecords() {
  const q = $('#search').value.toLowerCase();
  const cat = $('#category').value;

  const items = state.records.filter(r =>
    (!cat || r.category === cat) &&
    [
      r.speaker,
      r.company,
      r.title,
      r.category,
      r.notes,
      r.takeaways
    ].join(' ').toLowerCase().includes(q)
  );

  $('#count').textContent =
    `${items.length} RECORD${items.length === 1 ? '' : 'S'}`;

  $('#record-grid').innerHTML = items.length
    ? items.map(r => `
      <article
        class="record-card"
        tabindex="0"
        role="button"
        data-record="${esc(r.id)}"
        aria-label="Open ${esc(r.title)}"
      >
        <div class="sleeve ${esc(r.color)}">
          <span class="serial">
            THE VINYL ROOM /
            ${String(state.records.indexOf(r) + 1).padStart(3, '0')}
          </span>

          <div class="mini-record"></div>
          <h3>${esc(r.title)}</h3>
        </div>

        <div class="card-meta">
          ${esc(r.category)} /
          ${esc(r.date || 'UNDATED SESSION')}
        </div>

        <div class="card-title">${esc(r.speaker)}</div>
        <div class="card-sub">${esc(r.company)}</div>

        <div class="card-bottom">
          <span>OPEN THE RECORD</span>
          <span class="arrow-circle">↗</span>
        </div>
      </article>
    `).join('')
    : '<div class="empty">No records found. Add a new one or change your search.</div>';
}

function renderReflections() {
  $('#reflection-grid').innerHTML = state.reflections.length
    ? state.reflections.map((r, i) => `
      <article
        class="reflection-card"
        tabindex="0"
        role="button"
        data-reflection="${esc(r.id)}"
      >
        <div class="kicker">
          B-SIDE / ${String(i + 1).padStart(2, '0')}
        </div>

        <h3>${esc(r.title)}</h3>

        <p>
          ${esc(
            r.body.length > 210
              ? r.body.slice(0, 210) + '…'
              : r.body
          )}
        </p>

        <small>OPEN TO EDIT ↗</small>
      </article>
    `).join('')
    : '<div class="empty">Your B-side is waiting. Add your first personal reflection.</div>';
}

function openRecord(id) {
  const form = $('#editor-form');
  form.reset();

  const r = state.records.find(x => x.id === id);

  for (const name of [
    'id',
    'speaker',
    'company',
    'title',
    'date',
    'category',
    'color',
    'notes',
    'takeaways',
    'reflection'
  ]) {
    if (r && form.elements[name]) {
      form.elements[name].value = r[name] ?? '';
    }
  }

  $('#dialog-title').textContent =
    r ? 'Edit the record' : 'Add a new record';

  $('#dialog-kicker').textContent =
    r ? 'NOW PLAYING / EDIT TRACKS' : 'NEW RELEASE';

  $('#delete-record').hidden = !r;
  $('#editor-dialog').showModal();
}

function openReflection(id) {
  const form = $('#reflection-form');
  form.reset();

  const r = state.reflections.find(x => x.id === id);

  if (r) {
    for (const name of ['id', 'title', 'body']) {
      form.elements[name].value = r[name] ?? '';
    }
  }

  $('#reflection-title').textContent =
    r ? 'Edit reflection' : 'New reflection';

  $('#delete-reflection').hidden = !r;
  $('#reflection-dialog').showModal();
}

$('#add-record').onclick = () => openRecord();

$('#add-reflection').onclick = () => openReflection();

$('#search').oninput = renderRecords;

$('#category').onchange = renderRecords;

$('#record-grid').addEventListener('click', e => {
  const card = e.target.closest('[data-record]');

  if (card) {
    openRecord(card.dataset.record);
  }
});

$('#reflection-grid').addEventListener('click', e => {
  const card = e.target.closest('[data-reflection]');

  if (card) {
    openReflection(card.dataset.reflection);
  }
});

for (const selector of ['#record-grid', '#reflection-grid']) {
  $(selector).addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      const card = e.target.closest(
        '[data-record],[data-reflection]'
      );

      if (card) {
        e.preventDefault();
        card.click();
      }
    }
  });
}

$('#editor-form').addEventListener('submit', e => {
  e.preventDefault();

  const v = Object.fromEntries(new FormData(e.target));

  if (v.id) {
    const idx = state.records.findIndex(x => x.id === v.id);

    if (idx >= 0) {
      state.records[idx] = v;
    }
  } else {
    v.id = crypto.randomUUID?.() || String(Date.now());
    state.records.unshift(v);
  }

  persist();
  renderRecords();
  $('#editor-dialog').close();
});

$('#reflection-form').addEventListener('submit', e => {
  e.preventDefault();

  const v = Object.fromEntries(new FormData(e.target));

  if (v.id) {
    const idx = state.reflections.findIndex(x => x.id === v.id);

    if (idx >= 0) {
      state.reflections[idx] = v;
    }
  } else {
    v.id = crypto.randomUUID?.() || String(Date.now());
    state.reflections.unshift(v);
  }

  persist();
  renderReflections();
  $('#reflection-dialog').close();
});

$('#delete-record').onclick = () => {
  const id = $('#editor-form').elements.id.value;

  if (
    id &&
    confirm('Delete this record and all its notes?')
  ) {
    state.records = state.records.filter(r => r.id !== id);
    persist();
    renderRecords();
    $('#editor-dialog').close();
  }
};

$('#delete-reflection').onclick = () => {
  const id = $('#reflection-form').elements.id.value;

  if (
    id &&
    confirm('Delete this reflection?')
  ) {
    state.reflections = state.reflections.filter(
      r => r.id !== id
    );

    persist();
    renderReflections();
    $('#reflection-dialog').close();
  }
};

document.querySelectorAll('[data-close]').forEach(b => {
  b.onclick = () => b.closest('dialog').close();
});

$('#export-data').onclick = () => {
  const blob = new Blob(
    [
      JSON.stringify(
        {
          ...state,
          exportedAt: new Date().toISOString()
        },
        null,
        2
      )
    ],
    { type: 'application/json' }
  );

  const a = document.createElement('a');

  a.href = URL.createObjectURL(blob);
  a.download = 'the-vinyl-room-backup.json';
  a.click();

  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
};

$('#import-data').onchange = async e => {
  const file = e.target.files[0];

  if (!file) return;

  try {
    const data = JSON.parse(await file.text());

    if (
      !Array.isArray(data.records) ||
      !Array.isArray(data.reflections)
    ) {
      throw Error();
    }

    if (
      confirm('Replace your current notes with this backup?')
    ) {
      state = {
        records: data.records,
        reflections: data.reflections
      };

      persist();
      renderRecords();
      renderReflections();
    }
  } catch {
    alert('This is not a valid Vinyl Room backup file.');
  }

  e.target.value = '';
};

$('#menu').onclick = () =>
  $('.topbar nav').classList.toggle('open');

document.querySelectorAll('.topbar nav a').forEach(a => {
  a.onclick = () =>
    $('.topbar nav').classList.remove('open');
});

renderRecords();
renderReflections();
