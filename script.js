// Keep record artwork above the title so dark lettering never crosses the vinyl.
const coverStyle = document.createElement('style');
coverStyle.id = 'vinyl-room-readable-covers';
coverStyle.textContent = `
.record-card .sleeve {
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 7%;
  height: auto;
  min-height: 300px;
  aspect-ratio: 1 / 1;
  overflow: hidden;
}
.record-card .sleeve .serial {
  position: relative;
  inset: auto;
  z-index: 1;
  flex-shrink: 0;
}
.record-card .sleeve .mini-record {
  position: absolute;
  top: 15%;
  right: -6%;
  left: auto;
  bottom: auto;
  width: 32%;
  height: auto;
  aspect-ratio: 1 / 1;
  transform: none;
  z-index: 0;
  pointer-events: none;
}
.record-card .sleeve h3 {
  position: relative;
  inset: auto;
  z-index: 1;
  box-sizing: border-box;
  width: 100%;
  max-width: none;
  margin: auto 0 0;
  padding: 48% 0 0;
  font-size: clamp(1.25rem, 2.2vw, 2.25rem);
  line-height: 1.12;
  overflow-wrap: anywhere;
}
`;
document.head.appendChild(coverStyle);
const KEY='vinyl-room-v1';
const demo=[{"id": "session-launchlab-2026-10-09", "speaker": "LaunchLab Team", "company": "LaunchLab", "title": "Vibe Coding: From Idea to Website", "date": "2026-10-09", "category": "Innovation", "color": "coral", "notes": "The session introduced us to vibe coding, an approach to software development that uses AI to transform natural-language instructions into products. We explored several tools:\n\n1. Claude Design and Claude Code\n2. The importance of prompt engineering: The more specific the instructions, the more likely AI is to generate a result aligned with your expectations.\n3. GitHub: store, manage, and collaborate on projects.\n4. Vercel: connects to GitHub and transforms a project into a publicly accessible website.", "takeaways": "1. Coding is becoming more accessible\n2. Prompting is a skill, not just an instruction\n3. Creativity and technology complement each other\n4. Building a website involves more than design\n5. Learning by doing makes the difference", "reflection": ""}, {"id": "session-nick-goh-2026-10-30", "speaker": "Nick Goh", "company": "Yellow Pages Singapore", "title": "Building an AI Marketing Team", "date": "2026-10-30", "category": "Branding", "color": "blue", "notes": "Nick Goh introduced us to the concept of agentic AI workflows and demonstrated how artificial intelligence can support the different stages of marketing campaign development.\nThe workflow was demonstrated through Claude, using a fictional Louis Vuitton campaign as a practical example.\n\n1. Structuring an AI marketing team:\nThe Planning Team\n\n• Brief Writer: Develops the initial marketing brief based on project information, including objectives, target audience, budget, and timing.\n• Brief Validator: Reviews the brief, identifies weaknesses, and checks whether the objectives, audience, message, and metrics are clearly defined.\n• Strategist: Analyses the validated brief and develops the campaign’s central creative idea.\n\nThe Production Team\n\n• Designer / Art Director: Develops key visuals and creative concepts aligned with the campaign strategy.\n• Copywriter: Creates the messaging hierarchy and adapts copy for different marketing channels.\n• Reviewer: Evaluates the final outputs to ensure consistency with the brief, brand identity, and campaign objectives.\n\n2. The workflow included a human approval stage between planning and production: Brief Writer → Brief Validator → Strategist → Human Approval → Designer & Copywriter → Reviewer.\n\n3. Creating and Refining Marketing Briefs: The process involved defining the campaign’s objectives, identifying the target audience, establishing the key message and clarifying the expected outcomes.\n\n4. Developing research insights and transforming them into a coherent campaign strategy: AI was used to support research, identify potential positioning opportunities and structure the messaging hierarchy.\n\n5. The workflow moved from research and messaging to the creation of key visuals and campaign copy.\n\n6. The final stage involved reviewing the campaign materials to ensure they reflected the intended brand voice and creative concept.", "takeaways": "1. AI works better when responsabilities are clearly defined\n2. Strategy must come before execution\n3. Human judgment remains essential\n4. AI can support the entire marketing process\n5. Brand consistency cannot be overlooked", "reflection": ""}, {"id": "session-linkedin-2026-11-13", "speaker": "Cindy Leong", "company": "LinkedIn", "title": "Beyond Recruitment: Building Trust on LinkedIn", "date": "2026-11-13", "category": "Branding", "color": "sage", "notes": "1. Understanding the LinkedIn ecosystem\nLinkedIn connects four professional activities: Hire, Market, Learn and Sell. Beyond recruitment, it enables companies to reach professional audiences, share expertise, build relationships and create business opportunities.\n\n2. B2B marketing and the 95:5 rule\nThe session introduced the 95:5 rule, which suggests that only a small proportion of potential buyers are actively looking to purchase at a given time. B2B marketing should also build familiarity and trust among people who may become customers later, especially when purchasing decisions involve several stakeholders and long decision cycles.\n\n3. How AI is changing brand discovery\nThe speaker contrasted traditional search journeys with AI-mediated discovery. Instead of visiting several websites, users can ask an AI system to synthesise information and recommend solutions. Marketers therefore need to consider how clearly their brand and expertise are represented in the information these systems can access.\n\n4. SEO and Generative Engine Optimization\nSEO focuses on visibility in search-engine results, while Generative Engine Optimization (GEO) focuses on making content understandable and discoverable by generative AI systems.\nUseful practices discussed included:\n• Descriptive titles and clear headings.\n• Direct answers to specific questions.\n• Precise names for companies, products and people.\n• Evidence, examples and first-hand experience.\n• Captions or transcripts alongside videos.\n• Accurate and updated information.\nThese practices improve clarity and usefulness but do not guarantee AI citations. Research observations shared during the session were not independently verified in the class notes.\n\n5. Building credibility through people\nCompany pages communicate official information, while employees, founders and experts can contribute practical knowledge and personal perspectives. Useful contributions help audiences understand the people and expertise behind a business.\n\n6. LinkedIn advertising\nThe session covered Thought Leader Ads, video and single image ads, carousel ads, Event Ads, Sponsored Messaging and Connected TV. The speaker particularly recommended Thought Leader Ads, which amplify eligible posts from individuals. Paid visibility should support relevant content; exposure alone does not establish credibility or guarantee AI citation.\n\n7. Measuring meaningful results\nMarketing performance should be assessed against business objectives. Impressions and likes provide information about visibility and engagement, but should be considered alongside outcomes such as qualified enquiries, registrations and business opportunities.", "takeaways": "1. Build familiarity before buyers are ready.\nB2B marketing needs to support future demand as well as immediate sales opportunities.\n\n2. People help make expertise tangible.\nFounders and employees can strengthen a brand’s credibility by sharing specific knowledge and experience.\n\n3. Content should be easy to understand and useful to reference.\nClear structure, precise language and evidence benefit readers and can support AI discoverability.\n\n4. Paid promotion amplifies content; credibility must be earned.\nAdvertising can extend reach, but the message still needs to offer value.\n\n5. Measure progress towards a business goal.\nEngagement becomes more meaningful when connected to the audience and outcomes the brand wants to reach.", "reflection": ""}];
let state;try{state=JSON.parse(localStorage.getItem(KEY))}catch{}if(!state||!Array.isArray(state.records)||!Array.isArray(state.reflections))state={records:demo,reflections:[]};
// Published order and B-side content are also applied to browsers with older saved notes.
const publishedReflections = [{"id": "reflection-session-launchlab-2026-10-09", "title": "Vibe Coding: From Idea to Website", "body": "This session was particularly meaningful because it challenged my perception of what I could create without a technical background. Coming from a marketing and management background, I have always been more interested in the creative and strategic sides of digital projects than in coding itself. However, discovering how AI-powered tools can bridge the gap between an idea and its execution made me realise that technical knowledge is no longer the only factor determining what we can build. The most exciting part was having the opportunity to apply what we learned to a real project. Creating The Vinyl Room allowed me to combine my interest in creativity, design and storytelling with technologies I had never used before. Of course, the process wasn’t entirely straightforward. Moving between different platforms, understanding GitHub and deploying the website through Vercel required patience and experimentation. But that was probably the most valuable part of the experience. My biggest takeaway is that AI doesn’t replace creativity; it gives us new ways to express it. As someone interested in branding and digital marketing, I see enormous potential in using these tools to prototype ideas, create interactive brand experiences and bring creative concepts to life more independently."}, {"id": "reflection-session-nick-goh-2026-10-30", "title": "Building an AI Marketing Team", "body": "What I found most interesting about this session was the shift from thinking about AI as a tool to understanding it as part of an entire marketing workflow. Before this session, I mainly associated generative AI with individual tasks such as brainstorming, writing content, or generating visuals. Seeing how different AI agents could collaborate across the entire campaign development process made me reconsider how marketing teams might operate in the future. The Louis Vuitton example was particularly relevant: it showed how AI can support the development of a campaign from the initial brief to the final creative execution. However, it also raised an important question for me: If AI can generate increasingly sophisticated creative content, what will truly differentiate one brand from another? I believe the answer lies in strategic thinking, originality and a deep understanding of consumers. AI can accelerate the creative process, but it cannot automatically guarantee that an idea is meaningful, distinctive, or relevant to a brand’s audience. Another aspect I appreciated was the importance given to human approval within the workflow. To me, this reinforces the idea that the future of marketing is not necessarily about replacing people with AI, but about learning how to combine human expertise with technological capabilities. My biggest takeaway is that the real competitive advantage won’t come simply from using AI, but from knowing how to direct it strategically and creatively. As I continue developing my skills in marketing and branding, I see this as an increasingly important capability for future marketing professionals."}, {"id": "reflection-session-linkedin-2026-11-13", "title": "Beyond Recruitment: Building Trust on LinkedIn", "body": "What stayed with me most was the idea that marketing needs to start before someone is ready to buy. When working on a launch, it is easy to focus on the immediate response: whether people click, sign up or ask for more information. The 95:5 rule made me think more carefully about everyone who sees a message but does not need the product yet. That communication can still matter if it helps them remember the brand when a need eventually arises.\n\nThis feels particularly relevant as I begin working on marketing activities at Zeya Health. For a product such as Zeya Converse, explaining the features is only one part of the challenge. I would also want to explore content that helps clinic teams recognise familiar problems and understand how the product could fit into their daily work. Alongside launch announcements, practical examples and insights from the team could give people a reason to keep following the company.\n\nI also found the discussion about personal credibility relevant to my own use of LinkedIn. As I move from H-Farm to ESSEC and gain practical experience, I want my profile to communicate more than milestones. Sharing what I am learning, the questions I am exploring and examples of my work could help me express my interests in a more personal and concrete way. The Vinyl Room itself could become part of that process.\n\nThe discussion about AI discovery also raised a question for me: if marketers increasingly structure content to be referenced by AI, how can they preserve a distinctive voice? Clear headings and evidence are useful, but I would not want every brand to sound the same. My main learning is that clarity and personality need to work together. I want to create content that makes a brand easy to understand while still giving people something worth remembering."}];
function applyPublishedContent() {
  const placeholders = new Set(['demo-1', 'demo-2', 'demo-3']);
  state.records = state.records.filter(r => !placeholders.has(r.id));
  for (const published of demo) {
    if (!state.records.some(r => r.id === published.id)) state.records.push({...published});
  }
  const linkedinGuest = state.records.find(r => r.id === 'session-linkedin-2026-11-13');
  if (linkedinGuest) linkedinGuest.speaker = 'Cindy Leong';
  const order = new Map(demo.map((r, i) => [r.id, i]));
  state.records.sort((a, b) => (order.get(a.id) ?? Infinity) - (order.get(b.id) ?? Infinity));
  for (const record of state.records) moveRecordReflection(record);
  orderReflections();
}
function orderReflections() {
  const order = new Map(state.records.map((record, i) => ['reflection-' + record.id, i]));
  state.reflections.sort((a, b) => (order.get(a.id) ?? Infinity) - (order.get(b.id) ?? Infinity));
}
function moveRecordReflection(record) {
  const id = 'reflection-' + record.id;
  const existing = state.reflections.find(item => item.id === id);
  const seed = publishedReflections.find(item => item.id === id);
  const body = typeof record.reflection === 'string' ? record.reflection : '';
  if (body.trim()) {
    if (existing) existing.body = body;
    else state.reflections.push({id, title: record.title, body});
  } else if (!existing && seed) {
    state.reflections.push({...seed});
  }
  record.reflection = '';
}
function saveRecord(record) {
  if (!record.id) record.id = crypto.randomUUID?.() || String(Date.now());
  const index = state.records.findIndex(item => item.id === record.id);
  if (index >= 0) state.records[index] = record;
  else state.records.push(record);
  moveRecordReflection(record);
  const reflection = state.reflections.find(item => item.id === 'reflection-' + record.id);
  if (reflection) reflection.title = record.title;
  orderReflections();
}
applyPublishedContent();
try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {}
const $=s=>document.querySelector(s),esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const persist=()=>{try{localStorage.setItem(KEY,JSON.stringify(state));toast('Saved in this browser ✓')}catch{toast('Storage unavailable — export a backup')}};
function toast(message){const el=$('#toast');el.textContent=message;el.classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>el.classList.remove('show'),2400)}
function renderRecords(){const q=$('#search').value.toLowerCase(),cat=$('#category').value;const items=state.records.filter(r=>(!cat||r.category===cat)&&[r.speaker,r.company,r.title,r.category,r.notes,r.takeaways].join(' ').toLowerCase().includes(q));$('#count').textContent=`${items.length} RECORD${items.length===1?'':'S'}`;$('#record-grid').innerHTML=items.length?items.map((r,i)=>`<article class="record-card" tabindex="0" role="button" data-record="${esc(r.id)}" aria-label="Open ${esc(r.title)}"><div class="sleeve ${esc(r.color)}"><span class="serial">THE VINYL ROOM / ${String(state.records.indexOf(r)+1).padStart(3,'0')}</span><div class="mini-record"></div><h3>${esc(r.title)}</h3></div><div class="card-meta">${esc(r.category)} / ${esc(r.date||'UNDATED SESSION')}</div><div class="card-title">${esc(r.speaker)}</div><div class="card-sub">${esc(r.company)}</div><div class="card-bottom"><span>OPEN THE RECORD</span><span class="arrow-circle">↗</span></div></article>`).join(''):'<div class="empty">No records found. Add a new one or change your search.</div>'}
function renderReflections(){$('#reflection-grid').innerHTML=state.reflections.length?state.reflections.map((r,i)=>`<article class="reflection-card" tabindex="0" role="button" data-reflection="${esc(r.id)}"><div class="kicker">B-SIDE / ${String(i+1).padStart(2,'0')}</div><h3>${esc(r.title)}</h3><p>${esc(r.body.length>210?r.body.slice(0,210)+'…':r.body)}</p><small>OPEN TO EDIT ↗</small></article>`).join(''):'<div class="empty">Your B-side is waiting. Add your first personal reflection.</div>'}
function openRecord(id){const form=$('#editor-form');form.reset();const r=state.records.find(x=>x.id===id);for(const name of ['id','speaker','company','title','date','category','color','notes','takeaways','reflection'])if(r&&form.elements[name])form.elements[name].value=r[name]??'';if(r&&form.elements.reflection)form.elements.reflection.value=state.reflections.find(item=>item.id==='reflection-'+r.id)?.body||'';$('#dialog-title').textContent=r?'Edit the record':'Add a new record';$('#dialog-kicker').textContent=r?'NOW PLAYING / EDIT TRACKS':'NEW RELEASE';$('#delete-record').hidden=!r;$('#editor-dialog').showModal()}
function openReflection(id){const form=$('#reflection-form');form.reset();const r=state.reflections.find(x=>x.id===id);if(r)for(const name of ['id','title','body'])form.elements[name].value=r[name]??'';$('#reflection-title').textContent=r?'Edit reflection':'New reflection';$('#delete-reflection').hidden=!r;$('#reflection-dialog').showModal()}
$('#add-record').onclick=()=>openRecord();$('#add-reflection').onclick=()=>openReflection();$('#search').oninput=renderRecords;$('#category').onchange=renderRecords;
$('#record-grid').addEventListener('click',e=>{const card=e.target.closest('[data-record]');if(card)openRecord(card.dataset.record)});$('#reflection-grid').addEventListener('click',e=>{const card=e.target.closest('[data-reflection]');if(card)openReflection(card.dataset.reflection)});
for(const selector of ['#record-grid','#reflection-grid'])$(selector).addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){const card=e.target.closest('[data-record],[data-reflection]');if(card){e.preventDefault();card.click()}}});
$('#editor-form').addEventListener('submit',e=>{e.preventDefault();saveRecord(Object.fromEntries(new FormData(e.target)));persist();renderRecords();renderReflections();$('#editor-dialog').close()});
$('#reflection-form').addEventListener('submit',e=>{e.preventDefault();const v=Object.fromEntries(new FormData(e.target));if(v.id){const idx=state.reflections.findIndex(x=>x.id===v.id);if(idx>=0)state.reflections[idx]=v}else{v.id=crypto.randomUUID?.()||String(Date.now());state.reflections.unshift(v)}persist();renderReflections();$('#reflection-dialog').close()});
$('#delete-record').onclick=()=>{const id=$('#editor-form').elements.id.value;if(id&&confirm('Delete this record and all its notes?')){state.records=state.records.filter(r=>r.id!==id);persist();renderRecords();$('#editor-dialog').close()}};
$('#delete-reflection').onclick=()=>{const id=$('#reflection-form').elements.id.value;if(id&&confirm('Delete this reflection?')){state.reflections=state.reflections.filter(r=>r.id!==id);persist();renderReflections();$('#reflection-dialog').close()}};
document.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>b.closest('dialog').close());
$('#export-data').onclick=()=>{const blob=new Blob([JSON.stringify({...state,exportedAt:new Date().toISOString()},null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='the-vinyl-room-backup.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)};
$('#import-data').onchange=async e=>{const file=e.target.files[0];if(!file)return;try{const data=JSON.parse(await file.text());if(!Array.isArray(data.records)||!Array.isArray(data.reflections))throw Error();if(confirm('Replace your current notes with this backup?')){state={records:data.records,reflections:data.reflections};applyPublishedContent();persist();renderRecords();renderReflections()}}catch{alert('This is not a valid Vinyl Room backup file.')}e.target.value=''};
$('#menu').onclick=()=>$('.topbar nav').classList.toggle('open');document.querySelectorAll('.topbar nav a').forEach(a=>a.onclick=()=>$('.topbar nav').classList.remove('open'));
renderRecords();renderReflections();
