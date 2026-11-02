// =====================================================
// THE VINYL ROOM
// Guest Speaker Learning Journal
// =====================================================

// Storage key
const KEY = 'vinyl-room-v1';

// =====================================================
// PUBLISHED GUEST SPEAKER SESSIONS
// =====================================================

const demo = [

  // SESSION 01 — VIBE CODING
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

  // SESSION 02 — AI MARKETING TEAM
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

// =====================================================
// LOAD DATA
// =====================================================

let state;

try {
  state = JSON.parse(localStorage.getItem(KEY));
} catch (error) {
  state = null;
}

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
    ...state.records.filter(r =>
      !publishedIds.has(r.id) &&
      !String(r.id).startsWith('demo-')
    )
  ];

}

// =====================================================
// HELPERS
// =====================================================

const $ = selector => document.querySelector(selector);

const esc = value =>
  String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[char]));

function persist() {

  try {

    localStorage.setItem(KEY, JSON.stringify(state));

    toast('Saved in this browser ✓');

  } catch (error) {

    toast('Storage unavailable — export a backup');

  }

}

function toast(message) {

  const element = $('#toast');

  element.textContent = message;
  element.classList.add('show');

  clearTimeout(window.toastTimer);

  window.toastTimer = setTimeout(() => {
    element.classList.remove('show');
  }, 2400);

}

// =====================================================
// RENDER GUEST SPEAKER RECORDS
// =====================================================

function renderRecords() {

  const query = $('#search').value.toLowerCase();
  const category = $('#category').value;

  const items = state.records.filter(record => {

    const matchesCategory =
      !category || record.category === category;

    const searchableText = [
      record.speaker,
      record.company,
      record.title,
      record.category,
      record.notes,
      record.takeaways
    ].join(' ').toLowerCase();

    return matchesCategory &&
      searchableText.includes(query);

  });

  $('#count').textContent =
    `${items.length} RECORD${items.length === 1 ? '' : 'S'}`;

  $('#record-grid').innerHTML = items.length

    ? items.map(record => `

      <article
        class="record-card"
        tabindex="0"
        role="button"
        data-record="${esc(record.id)}"
        aria-label="Open ${esc(record.title)}"
      >

        <div class="sleeve ${esc(record.color)}">

          <span class="serial">
            THE VINYL ROOM /
            ${String(
              state.records.indexOf(record) + 1
            ).padStart(3, '0')}
          </span>

          <div class="mini-record"></div>

          <h3>${esc(record.title)}</h3>

        </div>

        <div class="card-meta">
          ${esc(record.category)} /
          ${esc(record.date || 'UNDATED SESSION')}
        </div>

        <div class="card-title">
          ${esc(record.speaker)}
        </div>

        <div class="card-sub">
          ${esc(record.company)}
        </div>

        <div class="card-bottom">
          <span>OPEN THE RECORD</span>
          <span class="arrow-circle">↗</span>
        </div>

      </article>

    `).join('')

    : '<div class="empty">No records found. Add a new one or change your search.</div>';

}

// =====================================================
// RENDER MY REFLECTIONS — THE B-SIDE
// =====================================================

function renderReflections() {

  // Reflections connected to guest speaker sessions

  const speakerReflections = state.records
    .filter(record =>
      record.reflection &&
      record.reflection.trim() !== ''
    )
    .map(record => ({

      id: record.id,
      title: record.title,
      body: record.reflection,
      speaker: record.speaker,
      type: 'record'

    }));

  // Independent reflections

  const personalReflections = state.reflections.map(
    reflection => ({

      ...reflection,
      type: 'personal'

    })
  );

  // Combine all reflections

  const allReflections = [
    ...speakerReflections,
    ...personalReflections
  ];

  $('#reflection-grid').innerHTML = allReflections.length

    ? allReflections.map((reflection, index) => `

      <article
        class="reflection-card"
        tabindex="0"
        role="button"
        data-${reflection.type === 'record'
          ? 'record'
          : 'reflection'}="${esc(reflection.id)}"
      >

        <div class="kicker">
          B-SIDE /
          ${String(index + 1).padStart(2, '0')}
        </div>

        <h3>
          ${esc(reflection.title)}
        </h3>

        ${
          reflection.speaker
            ? `<div class="card-sub">
                ${esc(reflection.speaker)}
               </div>`
            : ''
        }

        <p>
          ${esc(
            reflection.body.length > 210
              ? reflection.body.slice(0, 210) + '…'
              : reflection.body
          )}
        </p>

        <small>
          ${
            reflection.type === 'record'
              ? 'OPEN SESSION ↗'
              : 'OPEN TO EDIT ↗'
          }
        </small>

      </article>

    `).join('')

    : '<div class="empty">Your B-side is waiting. Add your first personal reflection.</div>';

}

// =====================================================
// OPEN RECORD EDITOR
// =====================================================

function openRecord(id) {

  const form = $('#editor-form');

  form.reset();

  const record = state.records.find(
    item => item.id === id
  );

  const fields = [
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
  ];

  for (const name of fields) {

    if (record && form.elements[name]) {

      form.elements[name].value =
        record[name] ?? '';

    }

  }

  $('#dialog-title').textContent =
    record ? 'Edit the record' : 'Add a new record';

  $('#dialog-kicker').textContent =
    record
      ? 'NOW PLAYING / EDIT TRACKS'
      : 'NEW RELEASE';

  $('#delete-record').hidden = !record;

  $('#editor-dialog').showModal();

}

// =====================================================
// OPEN PERSONAL REFLECTION EDITOR
// =====================================================

function openReflection(id) {

  const form = $('#reflection-form');

  form.reset();

  const reflection = state.reflections.find(
    item => item.id === id
  );

  if (reflection) {

    for (const name of ['id', 'title', 'body']) {

      form.elements[name].value =
        reflection[name] ?? '';

    }

  }

  $('#reflection-title').textContent =
    reflection
      ? 'Edit reflection'
      : 'New reflection';

  $('#delete-reflection').hidden = !reflection;

  $('#reflection-dialog').showModal();

}

// =====================================================
// BUTTON EVENTS
// =====================================================

$('#add-record').onclick = () => openRecord();

$('#add-reflection').onclick = () => openReflection();

$('#search').oninput = renderRecords;

$('#category').onchange = renderRecords;

// =====================================================
// RECORD CARD CLICKS
// =====================================================

$('#record-grid').addEventListener('click', event => {

  const card = event.target.closest('[data-record]');

  if (card) {
    openRecord(card.dataset.record);
  }

});

// =====================================================
// REFLECTION CARD CLICKS
// =====================================================

$('#reflection-grid').addEventListener('click', event => {

  const recordCard =
    event.target.closest('[data-record]');

  if (recordCard) {

    openRecord(recordCard.dataset.record);
    return;

  }

  const reflectionCard =
    event.target.closest('[data-reflection]');

  if (reflectionCard) {

    openReflection(
      reflectionCard.dataset.reflection
    );

  }

});

// =====================================================
// KEYBOARD ACCESSIBILITY
// =====================================================

for (const selector of [
  '#record-grid',
  '#reflection-grid'
]) {

  $(selector).addEventListener('keydown', event => {

    if (
      event.key === 'Enter' ||
      event.key === ' '
    ) {

      const card = event.target.closest(
        '[data-record],[data-reflection]'
      );

      if (card) {

        event.preventDefault();
        card.click();

      }

    }

  });

}

// =====================================================
// SAVE RECORD
// =====================================================

$('#editor-form').addEventListener('submit', event => {

  event.preventDefault();

  const values = Object.fromEntries(
    new FormData(event.target)
  );

  if (values.id) {

    const index = state.records.findIndex(
      record => record.id === values.id
    );

    if (index >= 0) {

      state.records[index] = values;

    }

  } else {

    values.id =
      crypto.randomUUID?.() ||
      String(Date.now());

    state.records.unshift(values);

  }

  persist();

  renderRecords();

  renderReflections();

  $('#editor-dialog').close();

});

// =====================================================
// SAVE PERSONAL REFLECTION
// =====================================================

$('#reflection-form').addEventListener(
  'submit',
  event => {

    event.preventDefault();

    const values = Object.fromEntries(
      new FormData(event.target)
    );

    if (values.id) {

      const index = state.reflections.findIndex(
        reflection => reflection.id === values.id
      );

      if (index >= 0) {

        state.reflections[index] = values;

      }

    } else {

      values.id =
        crypto.randomUUID?.() ||
        String(Date.now());

      state.reflections.unshift(values);

    }

    persist();

    renderReflections();

    $('#reflection-dialog').close();

  }
);

// =====================================================
// DELETE RECORD
// =====================================================

$('#delete-record').onclick = () => {

  const id =
    $('#editor-form').elements.id.value;

  if (
    id &&
    confirm('Delete this record and all its notes?')
  ) {

    state.records = state.records.filter(
      record => record.id !== id
    );

    persist();

    renderRecords();

    renderReflections();

    $('#editor-dialog').close();

  }

};

// =====================================================
// DELETE PERSONAL REFLECTION
// =====================================================

$('#delete-reflection').onclick = () => {

  const id =
    $('#reflection-form').elements.id.value;

  if (
    id &&
    confirm('Delete this reflection?')
  ) {

    state.reflections = state.reflections.filter(
      reflection => reflection.id !== id
    );

    persist();

    renderReflections();

    $('#reflection-dialog').close();

  }

};

// =====================================================
// CLOSE DIALOGS
// =====================================================

document.querySelectorAll('[data-close]').forEach(
  button => {

    button.onclick = () =>
      button.closest('dialog').close();

  }
);

// =====================================================
// EXPORT BACKUP
// =====================================================

$('#export-data').onclick = () => {

  const data = {
    ...state,
    exportedAt: new Date().toISOString()
  };

  const blob = new Blob(
    [JSON.stringify(data, null, 2)],
    { type: 'application/json' }
  );

  const link = document.createElement('a');

  link.href = URL.createObjectURL(blob);

  link.download =
    'the-vinyl-room-backup.json';

  link.click();

  setTimeout(() => {
    URL.revokeObjectURL(link.href);
  }, 1000);

};

// =====================================================
// IMPORT BACKUP
// =====================================================

$('#import-data').onchange = async event => {

  const file = event.target.files[0];

  if (!file) return;

  try {

    const data = JSON.parse(
      await file.text()
    );

    if (
      !Array.isArray(data.records) ||
      !Array.isArray(data.reflections)
    ) {
      throw new Error('Invalid backup');
    }

    if (
      confirm(
        'Replace your current notes with this backup?'
      )
    ) {

      state = {
        records: data.records,
        reflections: data.reflections
      };

      persist();

      renderRecords();

      renderReflections();

    }

  } catch (error) {

    alert(
      'This is not a valid Vinyl Room backup file.'
    );

  }

  event.target.value = '';

};

// =====================================================
// MOBILE MENU
// =====================================================

$('#menu').onclick = () => {

  $('.topbar nav').classList.toggle('open');

};

document.querySelectorAll(
  '.topbar nav a'
).forEach(link => {

  link.onclick = () => {

    $('.topbar nav').classList.remove('open');

  };

});

// =====================================================
// INITIAL RENDER
// =====================================================

renderRecords();

renderReflections();
