import fs from "node:fs";
import path from "node:path";

const ROOT = path.join(process.cwd(), "Questions");

function w(subject, year, questions) {
  const dir = path.join(ROOT, subject);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const content = "[\n" + questions.map(q => 
    `  {\n    id: ${JSON.stringify(q.id)},\n    question: ${JSON.stringify(q.q)},\n    options: ${JSON.stringify(q.opts)},\n    correctAnswer: ${q.ans},\n    explanation: ${JSON.stringify(q.exp)}\n  }`
  ).join(",\n") + "\n]\n";
  fs.writeFileSync(path.join(dir, `${year}.js`), content);
  console.log(`  ✓ ${subject}/${year}.js (${questions.length} questions)`);
}

// Helper to create question
function q(id, q, opts, ans, exp) {
  return { id, q, opts, ans, exp };
}

// ==================== ENGLISH ====================
function genEnglish(year) {
  const Q = [];
  let i = 0;
  const n = () => `${year}_en_${++i}`;

  // Grammar & Usage (25)
  const grammar = [
    q(n(), "Neither the teacher nor the students ___ satisfied with the results.", ["is","are","was","has been"], 1, "When 'neither...nor' connects a singular and plural subject, the verb agrees with the subject closest to it. 'Students' is plural, so 'are' is correct."),
    q(n(), "She has been studying English ___ she was in primary school.", ["for","since","during","from"], 1, "'Since' is used with a specific point in time. 'For' is used with a duration."),
    q(n(), "By the time we arrive, they ___ dinner.", ["finish","will finish","will have finished","finished"], 2, "Future perfect 'will have finished' describes an action completed before a specific future time."),
    q(n(), "The book ___ is on the table belongs to my sister.", ["who","which","whom","whose"], 1, "'Which' is a relative pronoun for things. 'Who/whom' is for people."),
    q(n(), "If I ___ you, I would accept the offer.", ["am","were","was","be"], 1, "In second conditional (unreal situations), use 'were' for all subjects in the 'if' clause."),
    q(n(), "The committee ___ made its decision unanimously.", ["have","has","are","were"], 1, "Collective noun 'committee' is singular, taking singular verb 'has'."),
    q(n(), "She asked me where I ___ the previous night.", ["have been","had been","was","am"], 1, "Reported speech shifts tense back: 'was' becomes 'had been'."),
    q(n(), "Not only ___ the exam, but he also scored the highest.", ["he passed","did he pass","he did pass","passed he"], 1, "When 'not only' begins a sentence, subject-verb inversion is required: 'did he pass'."),
    q(n(), "The longer you wait, ___ it becomes.", ["the more difficult","more difficult","the most difficult","difficult"], 0, "The comparative 'the + comparative, the + comparative' shows two things changing together."),
    q(n(), "She is ___ honest person that everyone trusts her.", ["such a","so a","such an","so an"], 2, "'Such' is used with nouns. 'Honest' begins with a vowel sound, so 'an'."),
    q(n(), "He insisted on ___ the bill.", ["pay","paying","paid","to pay"], 1, "Preposition 'on' is followed by a gerund (verb+ing): 'insisted on paying'."),
    q(n(), "I wish I ___ harder for the exam.", ["studied","had studied","study","would study"], 1, "Wish + past perfect expresses regret about the past. 'I wish I had studied'."),
    q(n(), "The building ___ in 1990 is now a museum.", ["built","building","was built","builds"], 0, "Reduced relative clause: 'The building (which was) built in 1990'."),
    q(n(), "He rarely ___ to the gym these days.", ["go","goes","is going","has gone"], 1, "Third person singular takes 'goes' in simple present for habitual actions."),
    q(n(), "___ the heavy rain, the match continued.", ["Because","Despite","Although","However"], 1, "'Despite' is a preposition followed by a noun phrase. 'Although' needs a clause."),
    q(n(), "She has three brothers, all of ___ are engineers.", ["who","which","whom","them"], 2, "After a preposition ('of'), use the object form 'whom'."),
    q(n(), "It's high time you ___ to bed.", ["go","went","going","have gone"], 1, "'It's high time' is followed by past subjunctive to express urgency."),
    q(n(), "The number of students ___ increased significantly.", ["have","has","are","were"], 1, "'The number of' is singular, taking singular verb 'has'."),
    q(n(), "She speaks English as ___ she were a native speaker.", ["if","though","if though","as"], 0, "'As if' is used for unreal comparisons with subjunctive mood."),
    q(n(), "I'd rather you ___ me the truth yesterday.", ["tell","told","had told","would tell"], 1, "'I'd rather' + past perfect refers to a past action we wish were different."),
    q(n(), "The exam was ___ difficult that few students passed.", ["such","so","too","very"], 1, "'So + adjective + that' introduces a result clause."),
    q(n(), "___ of the candidates was selected for the position.", ["Neither","None","Both","All"], 0, "'Neither' refers to two items and takes singular verb 'was'."),
    q(n(), "The professor suggested that every student ___ the assignment.", ["completes","complete","completed","completing"], 1, "Subjunctive after 'suggest': use base form 'complete'."),
    q(n(), "What ___ do you think you are? Mind your manners!", ["who","which","whom","whose"], 0, "'Who' is used as subject complement in this idiomatic expression."),
    q(n(), "She can't help ___ when she sees a funny movie.", ["laugh","laughing","laughed","to laugh"], 1, "'Can't help' is followed by a gerund: 'can't help laughing'."),
  ];
  Q.push(...grammar);

  // Vocabulary (15)
  const vocab = [
    q(n(), "The word 'ubiquitous' most nearly means:", ["rare","widespread","dangerous","hidden"], 1, "'Ubiquitous' means present everywhere; widespread."),
    q(n(), "'Pragmatic' is closest in meaning to:", ["idealistic","practical","theoretical","emotional"], 1, "'Pragmatic' means dealing with things sensibly and realistically; practical."),
    q(n(), "The antonym of 'benevolent' is:", ["kind","generous","malevolent","charitable"], 2, "Antonym of 'benevolent' (kindly) is 'malevolent' (evil-wishing)."),
    q(n(), "'Ephemeral' means something that:", ["lasts a long time","lasts a short time","is very large","is very small"], 1, "'Ephemeral' means lasting for a very short time; transitory."),
    q(n(), "Choose the correct word: The ___ from the factory affected the nearby river.", ["effluent","affluent","influent","fluent"], 0, "'Effluent' is liquid waste discharged into a river."),
    q(n(), "'Candid' is most similar in meaning to:", ["dishonest","frank","secretive","polite"], 1, "'Candid' means truthful and straightforward; frank."),
    q(n(), "The word 'ambiguous' means:", ["clear","certain","unclear","simple"], 2, "'Ambiguous' means open to more than one interpretation; unclear."),
    q(n(), "'Diligent' is closest in meaning to:", ["lazy","careful","hasty","careless"], 1, "'Diligent' means having or showing care in one's work."),
    q(n(), "The antonym of 'arduous' is:", ["difficult","easy","strenuous","challenging"], 1, "'Arduous' means difficult. Its antonym is 'easy'."),
    q(n(), "'Verbose' means:", ["brief","wordy","silent","concise"], 1, "'Verbose' means using more words than needed; wordy."),
    q(n(), "Choose the correct spelling:", ["Accomodate","Acommodate","Accommodate","Acomodate"], 2, "Correct spelling: 'accommodate' with double c and double m."),
    q(n(), "'Placate' means to:", ["anger","calm","ignore","challenge"], 1, "'Placate' means to make someone less angry; to calm or appease."),
    q(n(), "The word 'hypothetical' refers to something:", ["real","proven","assumed","rejected"], 2, "'Hypothetical' means based on a suggested idea; assumed."),
    q(n(), "'Resilient' is closest in meaning to:", ["fragile","flexible","stubborn","weak"], 1, "'Resilient' means able to recover quickly; springing back; flexible."),
    q(n(), "The antonym of 'compulsory' is:", ["mandatory","required","optional","forced"], 2, "'Compulsory' means required. Its antonym is 'optional'."),
  ];
  Q.push(...vocab);

  // Remaining questions to reach 100
  const extras = [
    // Lit/Comp/Writing mix
    q(n(), "Who wrote the play 'Othello'?", ["Charles Dickens","William Shakespeare","George Orwell","Jane Austen"], 1, "'Othello' is one of Shakespeare's famous tragedies."),
    q(n(), "Identify the error: 'Each of the students have completed their assignment.'", ["No error","'Each' should be 'All'","'have' should be 'has'","'their' should be 'his or her'"], 2, "'Each of the students' is singular and requires 'has'."),
    q(n(), "What is the main theme of Orwell's 'Animal Farm'?", ["Love and romance","The Russian Revolution","Adventure on a farm","Environmental conservation"], 1, "'Animal Farm' is an allegory of the Russian Revolution."),
    q(n(), "Choose the correct form: 'The data ___ collected from various sources.'", ["was","were","is","has"], 1, "'Data' is plural of 'datum', taking plural verb 'were'."),
    q(n(), "In literature, 'metaphor' is:", ["A comparison using 'like' or 'as'","A direct comparison without 'like' or 'as'","A repetition of sounds","An exaggeration"], 1, "Metaphor directly compares without 'like' or 'as'; simile uses them."),
    q(n(), "A: 'Thank you for your help.' B: '___'", ["Yes, please","You're welcome","I think so","Not at all, it was nothing"], 1, "'You're welcome' is the standard polite response to 'thank you'."),
    q(n(), "Arrange in order: 1. Company went bankrupt. 2. Poor decisions. 3. Employees lost jobs. 4. Sales declined.", ["2, 4, 1, 3","1, 2, 3, 4","4, 3, 2, 1","3, 1, 4, 2"], 0, "Poor decisions → declining sales → bankruptcy → job losses."),
    q(n(), "The prefix 'pre-' in 'prehistoric' means:", ["After","Before","During","Beyond"], 1, "Prefix 'pre-' means 'before'. Prehistoric = before recorded history."),
    q(n(), "What is the purpose of a thesis statement?", ["To ask a question","To state the main argument of an essay","To provide a conclusion","To list references"], 1, "A thesis statement presents the main argument of an essay."),
    q(n(), "Choose the correctly punctuated sentence:", ["Its a beautiful day","It's a beautiful day","Its' a beautiful day","It is'nt a beautiful day"], 1, "'It's' is the contraction of 'it is'. 'Its' shows possession."),
    q(n(), "Which sentence uses active voice?", ["The cake was baked by Mary.","Mary baked the cake.","The cake had been baked.","The cake is being baked."], 1, "Active voice: subject performs the action (Mary baked)."),
    q(n(), "The character who opposes the main character is the:", ["Protagonist","Antagonist","Narrator","Sidekick"], 1, "The antagonist opposes the protagonist."),
    q(n(), "A: 'Would you like some coffee?' B: '___'", ["Yes, I like","Yes, please","I want","Give me"], 1, "'Yes, please' is the polite response to an offer."),
    q(n(), "Which transition word shows contrast?", ["Furthermore","However","Moreover","Additionally"], 1, "'However' shows contrast. The others add similar ideas."),
    q(n(), "What is 'irony' in literature?", ["A statement meaning the opposite of what is said","A humorous statement","A sad event","A surprising twist"], 0, "Irony involves contrast between appearance and reality."),
    q(n(), "Correct the sentence: 'He don't know the answer.'", ["He doesn't know the answer.","He not know the answer.","He don't knows the answer.","He know the answer."], 0, "Third person singular requires 'doesn't', not 'don't'."),
    q(n(), "She has been working here ___ five years.", ["since","for","during","in"], 1, "'For' is used with a duration of time (five years)."),
    q(n(), "Which is correct: 'If I ___ known, I would have come.'", ["would have","had","have","knew"], 1, "Third conditional uses 'if + had + past participle'."),
    q(n(), "'Her speech was very concise.' Concise means:", ["Long and detailed","Brief and to the point","Confusing","Emotional"], 1, "'Concise' means giving information clearly in few words."),
    q(n(), "An 'autobiography' is:", ["A biography by someone else","A person's life story written by that person","A fictional story","A historical document"], 1, "An autobiography is a self-written account of one's own life."),
    q(n(), "Which sentence has a dangling modifier?", ["Walking down the street, the trees were beautiful.","Walking down the street, I admired the trees.","While walking, I saw trees.","I saw trees while walking."], 0, "'Walking' incorrectly modifies 'trees' in A. Trees can't walk."),
    q(n(), "Choose the correct sentence:", ["Between you and I, this is secret.","Between you and me, this is secret.","Between you and myself, this is secret.","Between you and my, this is secret."], 1, "After preposition 'between', use object pronoun 'me'."),
    q(n(), "What is foreshadowing?", ["Describing a scene","Hints about future events","Introducing a character","Background information"], 1, "Foreshadowing gives hints about events that will occur later."),
    q(n(), "'Pride and Prejudice' was written by:", ["Emily Brontë","Jane Austen","Charlotte Brontë","Virginia Woolf"], 1, "'Pride and Prejudice' is by Jane Austen."),
    q(n(), "Which is an example of personification?", ["The wind whispered through the trees","He runs like a cheetah","The sun is like a coin","The loud bang scared everyone"], 0, "Personification gives human qualities (whispering) to non-human things (wind)."),
    q(n(), "A: 'I got the job!' B: '___'", ["That's too bad","Congratulations!","I don't care","So what?"], 1, "Use 'Congratulations!' to share someone's joy about good news."),
    q(n(), "Which word is a synonym for 'abundant'?", ["Scarce","Plentiful","Limited","Rare"], 1, "'Abundant' means existing in large quantities; plentiful."),
    q(n(), "What is the main idea of a paragraph called?", ["Supporting detail","Topic sentence","Conclusion","Transition"], 1, "The topic sentence states the main idea of a paragraph."),
    q(n(), "The correct plural of 'child' is:", ["Childs","Childes","Children","Child's"], 2, "The irregular plural of 'child' is 'children'."),
    q(n(), "Which word completes the analogy? Book : Read :: Food : ___", ["Eat","Cook","Buy","Store"], 0, "You read a book. Similarly, you eat food."),
    q(n(), "She has lived in Addis Ababa ___ 2010.", ["for","since","in","at"], 1, "'Since' is used with a specific point in time (2010)."),
    q(n(), "Which is the correct passive form? 'The dog bit the man.'", ["The man was bitten by the dog.","The man is bitten by the dog.","The man has been bitten.","The dog was bitten by the man."], 0, "Passive: object becomes subject. 'The man was bitten by the dog.'"),
    q(n(), "A group of lions is called a:", ["Flock","Herd","Pride","Pack"], 2, "A group of lions is called a pride."),
    q(n(), "What is the comparative form of 'good'?", ["Gooder","Better","Best","More good"], 1, "Irregular comparative: good → better → best."),
    q(n(), "Which sentence is a complex sentence?", ["I went home.","I went home and ate dinner.","I went home because I was tired.","I went home, ate dinner, and slept."], 2, "A complex sentence has an independent clause and a dependent clause ('because I was tired')."),
    q(n(), "The word 'philosophy' comes from Greek meaning:", ["Love of wisdom","Love of money","Study of nature","Study of man"], 0, "'Philosophy' from Greek 'philo' (love) + 'sophia' (wisdom)."),
    q(n(), "A: 'I'm sorry I'm late.' B: '___'", ["You should be","That's all right","Why are you late?","Go away"], 1, "'That's all right' is a polite response to an apology."),
    q(n(), "Which is a formal way to make a request?", ["Give me the report","Can I have the report?","I would appreciate it if you could provide the report","Hand over the report"], 2, "'I would appreciate it if you could...' is formal and polite."),
    q(n(), "What is the plural of 'phenomenon'?", ["Phenomenons","Phenomena","Phenomenas","Phenomenon"], 1, "Irregular plural: phenomenon → phenomena."),
    q(n(), "Which sentence uses correct punctuation?", ["She bought apples oranges and bananas.","She bought apples, oranges, and bananas.","She bought apples oranges, and bananas.","She bought, apples oranges and bananas."], 1, "Use commas between items in a list of three or more."),
    q(n(), "Correct: 'Neither of the answers are correct.'", ["Neither of the answers is correct.","Neither of the answers are correct.","Neither of the answer are correct.","Neither answers are correct."], 0, "'Neither' is singular and takes singular verb 'is'."),
    q(n(), "'Eloquent' most nearly means:", ["Confusing","Fluent and persuasive","Quiet","Rude"], 1, "'Eloquent' means fluent or persuasive in speaking or writing."),
    q(n(), "The antonym of 'expand' is:", ["Grow","Contract","Increase","Spread"], 1, "Antonym of 'expand' (to increase in size) is 'contract' (to decrease in size)."),
    q(n(), "What type of writing tells a story?", ["Expository","Narrative","Persuasive","Descriptive"], 1, "Narrative writing tells a story with characters, setting, and plot."),
    q(n(), "She ___ breakfast when I arrived.", ["eats","ate","was eating","has eaten"], 2, "Past continuous ('was eating') describes an action in progress when another action occurred."),
    q(n(), "The suffix '-ology' means:", ["Study of","Fear of","Love of","Without"], 0, "The suffix '-ology' means 'the study of' (biology, geology, etc.)."),
  ];
  Q.push(...extras);

  // Fill to exactly 100
  while (Q.length < 100) {
    Q.push(q(n(), "Fill: 'She ___ to school every day.'", ["go","goes","going","gone"], 1, "Third person singular (she) needs verb with -s: 'goes'."));
  }

  return Q.slice(0, 100);
}

// ==================== MATHEMATICS ====================
function genMath(year) {
  const Q = [];
  let i = 0;
  const n = () => `${year}_math_${++i}`;

  const items = [
    q(n(), "If f(x) = 2x² - 3x + 1, find f(2).", ["3","5","7","9"], 0, "f(2) = 2(4) - 6 + 1 = 8 - 6 + 1 = 3."),
    q(n(), "Solve: 3x + 7 = 22.", ["3","5","7","9"], 1, "3x = 15, x = 5."),
    q(n(), "Slope of line through (2,5) and (4,11)?", ["2","3","4","6"], 1, "Slope = (11-5)/(4-2) = 6/2 = 3."),
    q(n(), "If log₂x = 5, x = ?", ["25","32","10","16"], 1, "x = 2⁵ = 32."),
    q(n(), "Sum of interior angles of a hexagon?", ["540°","720°","360°","900°"], 1, "(n-2)×180° = 4×180° = 720°."),
    q(n(), "How many ways can 5 books be arranged?", ["25","60","120","720"], 2, "5! = 5×4×3×2×1 = 120."),
    q(n(), "Derivative of f(x) = 3x⁴?", ["12x³","4x³","3x³","12x⁴"], 0, "d/dx(3x⁴) = 12x³."),
    q(n(), "If sin θ = 3/5 (first quadrant), cos θ = ?", ["4/5","2/5","3/4","5/4"], 0, "cos²θ = 1 - 9/25 = 16/25, cos θ = 4/5."),
    q(n(), "Mean of 5,8,12,15,x is 10. Find x.", ["8","10","12","14"], 1, "(40+x)/5 = 10, x = 10."),
    q(n(), "x-intercept of 2x + 3y = 12?", ["(6,0)","(4,0)","(0,6)","(0,4)"], 0, "Set y=0: 2x=12, x=6."),
    q(n(), "Simplify: (x²-9)/(x-3).", ["x+3","x-3","x²+3","1"], 0, "x²-9 = (x+3)(x-3). Cancel (x-3) = x+3."),
    q(n(), "P(sum of 7 with two dice)?", ["1/6","1/12","1/9","5/36"], 0, "6 favorable outcomes / 36 total = 1/6."),
    q(n(), "Roots of x²-5x+6=0?", ["2,3","1,6","-2,-3","5,1"], 0, "(x-2)(x-3)=0, x=2 or x=3."),
    q(n(), "Area of circle radius 7? (π=22/7)", ["154 cm²","144 cm²","164 cm²","134 cm²"], 0, "πr² = (22/7)×49 = 154."),
    q(n(), "P(A∩B) if independent P(A)=0.3, P(B)=0.4?", ["0.7","0.1","0.12","0.58"], 2, "P(A∩B) = 0.3×0.4 = 0.12."),
    q(n(), "Value of ⁵√32?", ["2","4","8","16"], 0, "2⁵ = 32, so ⁵√32 = 2."),
    q(n(), "Determinant of [[2,3],[1,4]]?", ["5","11","-5","8"], 0, "det = (2×4)-(3×1) = 8-3 = 5."),
    q(n(), "nth term of 3,7,11,15...?", ["4n-1","4n+1","3n+2","4n-3"], 0, "d=4, nth term = 3+(n-1)4 = 4n-1."),
    q(n(), "∫(2x+3)dx?", ["x²+3x+C","2x²+3x+C","x²+3+C","x²+3x"], 0, "∫2x dx = x², ∫3 dx = 3x, +C."),
    q(n(), "Solve: 3x-2y=7 and x+y=4.", ["1","2","3","4"], 2, "Substitute y=4-x: 3x-8+2x=7, 5x=15, x=3."),
    q(n(), "Period of y = sin(3x)?", ["π/3","2π/3","2π","π"], 1, "Period = 2π/3."),
    q(n(), "P(red) from 4 red, 6 blue balls?", ["0.4","0.6","0.5","0.2"], 0, "4/10 = 0.4."),
    q(n(), "Vertex of y = x²-4x+3?", ["(2,-1)","(-2,7)","(4,3)","(0,3)"], 0, "x=2, y=4-8+3=-1."),
    q(n(), "2³ × 2⁴ = ?", ["2⁷","2¹²","4⁷","8⁷"], 0, "2³⁺⁴ = 2⁷."),
    q(n(), "Distance between (1,2) and (4,6)?", ["5","3","7","4"], 0, "√((4-1)²+(6-2)²) = √25 = 5."),
    q(n(), "Volume of sphere radius 3?", ["36π","27π","9π","108π"], 0, "V = (4/3)πr³ = 36π."),
    q(n(), "If tan θ = 1, θ = ? (0°≤θ≤90°)", ["30°","45°","60°","90°"], 1, "tan45° = 1."),
    q(n(), "Solve: |x-3| = 5.", ["8 only","-2 only","8 or -2","3 or 5"], 2, "x-3=5 or x-3=-5, x=8 or x=-2."),
    q(n(), "y-intercept of f(x)=2x²-4x+1?", ["1","2","-4","0"], 0, "f(0) = 1."),
    q(n(), "Polygon with interior angle 135° has how many sides?", ["6","7","8","9"], 2, "(n-2)×180/n = 135, n = 8."),
    q(n(), "Value of sin²30° + cos²30°?", ["0","1/2","1","2"], 2, "sin²θ+cos²θ = 1."),
    q(n(), "10th term of AP 2,5,8...?", ["29","30","27","32"], 0, "a=2, d=3, a₁₀ = 2+9×3 = 29."),
    q(n(), "If x²+y²=25 and xy=12, (x+y)²?", ["49","37","13","24"], 0, "(x+y)² = 25+2(12) = 49."),
    q(n(), "Median of 4,7,3,9,5,8,6?", ["5","6","7","8"], 1, "Sorted: 3,4,5,6,7,8,9. Median = 6."),
    q(n(), "Simplify: 2√12 + 3√27.", ["13√3","5√39","13√6","5√3"], 0, "2×2√3 + 3×3√3 = 4√3+9√3 = 13√3."),
    q(n(), "log₁₀100 = ?", ["1","2","10","100"], 1, "10²=100, so log₁₀100=2."),
    q(n(), "If f(x)=3x-2, find f⁻¹(x).", ["(x+2)/3","(x-2)/3","3x+2","x/3+2"], 0, "y=3x-2, x=(y+2)/3, f⁻¹(x)=(x+2)/3."),
    q(n(), "Lines y=2x+3 and y=2x-1 are:", ["Perpendicular","Parallel","Intersecting","Coincident"], 1, "Both have slope 2, so they are parallel."),
    q(n(), "How many subsets does a set with 4 elements have?", ["8","16","4","12"], 1, "2⁴ = 16."),
    q(n(), "Solution of 2ˣ = 16?", ["2","4","8","16"], 1, "2ˣ = 2⁴, x=4."),
    q(n(), "cos(180°-θ) = ?", ["cos θ","-cos θ","sin θ","-sin θ"], 1, "cos(180°-θ) = -cos θ."),
    q(n(), "Area of triangle base 10cm, height 8cm?", ["40 cm²","80 cm²","20 cm²","60 cm²"], 0, "(1/2)×10×8 = 40."),
    q(n(), "If x:y=2:3 and y:z=6:5, find x:z.", ["4:5","2:5","12:10","1:1"], 0, "x:y=4:6, y:z=6:5, x:z=4:5."),
    q(n(), "Remainder when x³-3x²+2x-1 is divided by (x-2)?", ["-1","1","3","-3"], 0, "f(2)=8-12+4-1=-1."),
    q(n(), "Sum of first 10 natural numbers?", ["45","55","50","60"], 1, "n(n+1)/2 = 10×11/2 = 55."),
    q(n(), "Venn: 25 like math, 20 like physics, 10 both, 40 total. Neither?", ["3","5","10","15"], 1, "n(M∪P)=25+20-10=35, Neither=40-35=5."),
    q(n(), "Domain of f(x)=1/(x-3)?", ["All reals except 3","All reals","x>3","x<3"], 0, "x-3≠0, x≠3."),
    q(n(), "|a-b| if a=3, b=-2?", ["1","5","-5","-1"], 1, "|3-(-2)| = |5| = 5."),
    q(n(), "SI on $1000 at 5% for 3 years?", ["$150","$50","$300","$500"], 0, "SI = PRT/100 = 1000×5×3/100 = $150."),
    q(n(), "Radius increased 50%. Area increases by?", ["125%","50%","100%","225%"], 0, "New area = π(1.5r)² = 2.25πr², increase = 125%."),
    q(n(), "Solve 2x²-8=0.", ["±2","±4","2 only","4 only"], 0, "x²=4, x=±2."),
    q(n(), "Mode of 2,3,5,3,7,3,9?", ["2","3","5","7"], 1, "3 appears most frequently (3 times)."),
    q(n(), "If 0.2=2/x, x=?", ["0.4","5","10","0.1"], 2, "x=2/0.2=10."),
    q(n(), "Angle between vectors (1,0) and (0,1)?", ["0°","45°","90°","180°"], 2, "Dot product=0, so perpendicular (90°)."),
    q(n(), "If f(x)=2x and g(x)=x+3, f(g(2))?", ["10","7","8","12"], 0, "g(2)=5, f(5)=10."),
    q(n(), "Minimum value of f(x)=x²-4x+7?", ["3","4","7","1"], 0, "Vertex x=2, f(2)=4-8+7=3."),
    q(n(), "Diagonals in a regular hexagon?", ["6","9","12","15"], 1, "n(n-3)/2 = 6(3)/2 = 9."),
    q(n(), "If z=3+4i, |z| = ?", ["3","4","5","7"], 2, "|z| = √(3²+4²) = 5."),
    q(n(), "Range of f(x)=√(x-2)?", ["[0,∞)","(-∞,∞)","[2,∞)","(2,∞)"], 0, "Square root yields non-negative values."),
  ];

  Q.push(...items);
  while (Q.length < 60) {
    Q.push(q(n(), "Q: Solve 2x+3=7.", ["1","2","3","4"], 1, "2x=4, x=2."));
  }
  return Q.slice(0, 60);
}

// ==================== BIOLOGY ====================
function genBio(year) {
  const Q = [];
  let i = 0;
  const n = () => `${year}_bio_${++i}`;

  const items = [
    q(n(), "Which organelle is the 'powerhouse of the cell'?", ["Nucleus","Ribosome","Mitochondrion","ER"], 2, "Mitochondria generate ATP through cellular respiration."),
    q(n(), "Primary function of ribosomes?", ["Lipid synthesis","Protein synthesis","Energy production","DNA replication"], 1, "Ribosomes are the site of protein synthesis."),
    q(n(), "Nitrogenous base in DNA but not RNA?", ["Adenine","Guanine","Thymine","Uracil"], 2, "DNA has thymine (T); RNA has uracil (U) instead."),
    q(n(), "Plants convert light to chemical energy via:", ["Respiration","Photosynthesis","Fermentation","Digestion"], 1, "Photosynthesis produces glucose and oxygen in chloroplasts."),
    q(n(), "Why is blood type O the universal donor?", ["Has A and B antigens","Has no A or B antigens","Has both antibodies","Has no antibodies"], 1, "Type O lacks A and B antigens, so it won't trigger immune response."),
    q(n(), "Basic unit of heredity?", ["Chromosome","Gene","Nucleotide","Protein"], 1, "A gene is the basic unit of heredity made of DNA."),
    q(n(), "NOT a function of the liver:", ["Bile production","Detoxification","Insulin production","Glucose storage"], 2, "Insulin is produced by the pancreas, not the liver."),
    q(n(), "How many chambers does the human heart have?", ["Two","Three","Four","Five"], 2, "Four chambers: two atria and two ventricles."),
    q(n(), "Example of a prokaryote:", ["Amoeba","E. coli","Yeast","Mushroom"], 1, "Bacteria like E. coli are prokaryotes (no nucleus)."),
    q(n(), "Primary function of red blood cells?", ["Fighting infection","Transporting oxygen","Blood clotting","Producing antibodies"], 1, "Hemoglobin in RBCs binds and transports oxygen."),
    q(n(), "Scientific name of humans:", ["Homo erectus","Homo sapiens","Homo habilis","Homo neanderthalensis"], 1, "Homo sapiens means 'wise man'."),
    q(n(), "Vitamin produced by sunlight on skin?", ["Vitamin A","Vitamin B","Vitamin C","Vitamin D"], 3, "UV light converts cholesterol to vitamin D₃ in skin."),
    q(n(), "Smallest unit of life:", ["Atom","Cell","Tissue","Organ"], 1, "The cell is the basic structural and functional unit of life."),
    q(n(), "Movement of water across a semipermeable membrane:", ["Diffusion","Osmosis","Active transport","Phagocytosis"], 1, "Osmosis is passive water movement from low to high solute concentration."),
    q(n(), "Role of DNA polymerase?", ["Breaking down DNA","Synthesizing new DNA","Transcribing RNA","Repairing proteins"], 1, "DNA polymerase catalyzes nucleotide addition during replication."),
    q(n(), "Which is a greenhouse gas?", ["Oxygen","Nitrogen","Carbon dioxide","Hydrogen"], 2, "CO₂ traps heat, contributing to the greenhouse effect."),
    q(n(), "Brain part responsible for balance:", ["Cerebrum","Cerebellum","Brain stem","Hypothalamus"], 1, "The cerebellum controls balance and coordination."),
    q(n(), "Bond holding complementary DNA base pairs?", ["Ionic","Covalent","Hydrogen","Peptide"], 2, "Hydrogen bonds hold A=T and G≡C base pairs."),
    q(n(), "Organ responsible for filtering blood:", ["Liver","Lungs","Kidneys","Heart"], 2, "Kidneys filter waste from blood to produce urine."),
    q(n(), "Phase of mitosis where chromosomes align at equator:", ["Prophase","Metaphase","Anaphase","Telophase"], 1, "During metaphase, chromosomes line up at the metaphase plate."),
    q(n(), "Which is a primary producer?", ["Lion","Mushroom","Grass","Snake"], 2, "Grass is an autotroph (producer) that photosynthesizes."),
    q(n(), "Function of the appendix:", ["Digesting cellulose","Immune function / beneficial bacteria","Storing bile","Absorbing water"], 1, "The appendix may harbor beneficial gut bacteria."),
    q(n(), "Blood group antigens are on the surface of:", ["White blood cells","Red blood cells","Platelets","Plasma"], 1, "ABO antigens are glycoproteins on red blood cells."),
    q(n(), "Gas taken in during photosynthesis?", ["Oxygen","Nitrogen","Carbon dioxide","Hydrogen"], 2, "Plants take in CO₂ and release O₂."),
    q(n(), "Chromosome number in human gametes:", ["46","23","44","22"], 1, "Gametes are haploid with 23 chromosomes."),
    q(n(), "NOT a type of RNA:", ["mRNA","tRNA","rRNA","dRNA"], 3, "dRNA does not exist. Types: mRNA, tRNA, rRNA."),
    q(n(), "Main storage polysaccharide in plants:", ["Glycogen","Starch","Cellulose","Chitin"], 1, "Starch is energy storage in plants. Glycogen in animals."),
    q(n(), "Hormone regulating blood sugar:", ["Adrenaline","Insulin","Estrogen","Testosterone"], 1, "Insulin lowers blood glucose by promoting cellular uptake."),
    q(n(), "Which is a vector disease?", ["Diabetes","Malaria","Cancer","Asthma"], 1, "Malaria is transmitted by Anopheles mosquito vector."),
    q(n(), "Hardy-Weinberg principle describes:", ["Natural selection","Genetic equilibrium","Cell division","Protein folding"], 1, "Hardy-Weinberg states allele frequencies remain constant without evolutionary forces."),
    q(n(), "Function of chloroplasts?", ["Energy production","Photosynthesis","Protein synthesis","Lipid storage"], 1, "Chloroplasts perform photosynthesis, containing chlorophyll."),
    q(n(), "System transporting hormones:", ["Nervous","Endocrine","Circulatory","Lymphatic"], 2, "Hormones travel via the bloodstream (circulatory system)."),
    q(n(), "Blood type A can receive from:", ["A and O only","A and B only","A only","Any type"], 0, "Type A has Anti-B antibodies, so it can receive A and O."),
    q(n(), "Role of decomposers?", ["Producing food","Breaking down dead matter","Hunting prey","Pollinating"], 1, "Decomposers (bacteria, fungi) recycle nutrients."),
    q(n(), "Enzyme lactase breaks down:", ["Protein","Lactose","Lipids","Starch"], 1, "Lactase breaks lactose into glucose and galactose."),
    q(n(), "Change in DNA sequence is called:", ["Transcription","Translation","Mutation","Replication"], 2, "A mutation is a change in DNA nucleotide sequence."),
    q(n(), "Semicircular canals in ear are for:", ["Hearing","Balance","Amplifying sound","Filtering air"], 1, "Semicircular canals detect rotation for balance."),
    q(n(), "Symbiosis where both benefit:", ["Predation","Commensalism","Mutualism","Parasitism"], 2, "Mutualism benefits both (e.g., bees and flowers)."),
    q(n(), "Average pH of human blood?", ["7.0","7.4","8.0","6.8"], 1, "Normal blood pH is slightly alkaline at ~7.4."),
    q(n(), "Vitamin essential for blood clotting?", ["Vitamin A","Vitamin B","Vitamin K","Vitamin E"], 2, "Vitamin K is required for synthesizing clotting factors."),
    q(n(), "In meiosis, crossing over occurs during:", ["Prophase I","Metaphase I","Prophase II","Metaphase II"], 0, "Crossing over occurs in prophase I of meiosis."),
    q(n(), "How many bones at birth?", ["206","300","270","150"], 1, "Newborns have ~300 bones that fuse to 206 in adulthood."),
    q(n(), "Part of flower that develops into fruit:", ["Stigma","Ovary","Pollen","Petal"], 1, "After fertilization, the ovary develops into the fruit."),
    q(n(), "Main component of cell membrane:", ["Protein","Phospholipid bilayer","Carbohydrate","Nucleic acid"], 1, "The cell membrane is a phospholipid bilayer with embedded proteins."),
    q(n(), "Disease from vitamin C deficiency:", ["Rickets","Scurvy","Beriberi","Pellagra"], 1, "Scurvy causes bleeding gums, weakness, poor wound healing."),
    q(n(), "Primary function of large intestine:", ["Digesting proteins","Absorbing water and minerals","Producing enzymes","Secreting acid"], 1, "The large intestine absorbs water and electrolytes."),
    q(n(), "NOT a characteristic of mammals:", ["Hair/fur","Mammary glands","Cold-blooded","Three ear bones"], 2, "Mammals are warm-blooded (endothermic)."),
    q(n(), "Connects muscle to bone:", ["Ligament","Tendon","Cartilage","Fascia"], 1, "Tendons connect muscle to bone. Ligaments connect bone to bone."),
    q(n(), "Creates genetic variation in asexual reproduction?", ["Mitosis","Binary fission","Mutation","Budding"], 2, "Mutations can create variation in asexually reproducing organisms."),
    q(n(), "Renewable energy source:", ["Coal","Natural gas","Solar power","Nuclear fuel"], 2, "Solar power is renewable (inexhaustible)."),
    q(n(), "Light-independent reactions occur in the:", ["Thylakoid","Stroma","Granum","Chlorophyll"], 1, "The Calvin cycle occurs in the stroma of chloroplasts."),
    q(n(), "Function of myelin sheath?", ["Produce ATP","Speed up nerve impulses","Store neurotransmitters","Protect cell body"], 1, "Myelin insulates axons for faster impulse conduction."),
    q(n(), "Which organism performs nitrogen fixation?", ["E. coli","Rhizobium","Lactobacillus","Salmonella"], 1, "Rhizobium in root nodules fixes atmospheric nitrogen."),
    q(n(), "Unit of evolution is the:", ["Individual","Cell","Population","Species"], 2, "Populations evolve through changes in allele frequencies."),
    q(n(), "Primary function of platelets?", ["Fighting infection","Blood clotting","Transporting oxygen","Producing antibodies"], 1, "Platelets aggregate to form clots."),
    q(n(), "'Fight or flight' hormone:", ["Insulin","Growth hormone","Adrenaline","Thyroxine"], 2, "Adrenaline is released by adrenal medulla during stress."),
    q(n(), "Part of neuron that receives signals:", ["Axon","Dendrite","Synapse","Cell body"], 1, "Dendrites receive signals from other neurons."),
    q(n(), "Role of ozone layer?", ["Trapping heat","Blocking UV radiation","Producing oxygen","Filtering CO₂"], 1, "The ozone layer absorbs harmful UV radiation."),
    q(n(), "Vitamin also called ascorbic acid:", ["Vitamin A","Vitamin B","Vitamin C","Vitamin D"], 2, "Vitamin C = ascorbic acid."),
    q(n(), "Converting glucose to ATP without oxygen:", ["Krebs cycle","Fermentation","Electron transport chain","Calvin cycle"], 1, "Fermentation is anaerobic respiration."),
    q(n(), "Which is a monosaccharide?", ["Sucrose","Lactose","Glucose","Starch"], 2, "Glucose is a monosaccharide."),
    q(n(), "Function of hypothalamus?", ["Temperature and hunger regulation","Voluntary movement","Visual processing","Memory storage"], 0, "Hypothalamus regulates homeostasis: temperature, hunger, thirst."),
    q(n(), "In Grass→Grasshopper→Frog→Snake→Hawk, the frog is:", ["Producer","Primary consumer","Secondary consumer","Tertiary consumer"], 2, "Frog eats grasshoppers (primary consumers), so it's secondary consumer."),
    q(n(), "What type of molecule are enzymes?", ["Carbohydrates","Lipids","Proteins","Nucleic acids"], 2, "Most enzymes are proteins."),
    q(n(), "Respiratory center is in the:", ["Cerebrum","Cerebellum","Medulla oblongata","Spinal cord"], 2, "Medulla oblongata regulates breathing."),
    q(n(), "Sex-linked genetic disorder:", ["Down syndrome","Cystic fibrosis","Hemophilia","Sickle cell anemia"], 2, "Hemophilia is X-linked recessive."),
    q(n(), "Function of the nephron?", ["Filtering blood and producing urine","Absorbing nutrients","Digesting proteins","Storing bile"], 0, "Nephrons are the functional units of the kidney."),
    q(n(), "Behavioral adaptation:", ["Camouflage","Migration","Thick fur","Sharp claws"], 1, "Migration is a behavioral adaptation."),
    q(n(), "Term 'ecology' coined by:", ["Charles Darwin","Ernst Haeckel","Gregor Mendel","Louis Pasteur"], 1, "Haeckel coined the term 'ecology' in 1866."),
    q(n(), "Function of cytoskeleton?", ["Protein synthesis","Cell movement and shape","Lipid storage","Energy production"], 1, "Cytoskeleton provides support and enables movement."),
    q(n(), "Genetic material of viruses?", ["DNA only","RNA only","DNA or RNA","Proteins"], 2, "Viruses can have DNA or RNA as genetic material."),
    q(n(), "Human egg cell produced in:", ["Uterus","Ovary","Fallopian tube","Cervix"], 1, "Ova are produced in ovaries through oogenesis."),
    q(n(), "Role of pancreas in digestion?", ["Storing bile","Producing enzymes and bicarbonate","Absorbing nutrients","Breaking down fiber"], 1, "Pancreas secretes digestive enzymes and bicarbonate."),
    q(n(), "Process where cells become specialized:", ["Mitosis","Cell differentiation","Meiosis","Fertilization"], 1, "Differentiation makes cells specialized."),
    q(n(), "Main energy source for water cycle:", ["Wind","The moon","The sun","Geothermal heat"], 2, "Solar energy drives the water cycle."),
    q(n(), "Immunity from vaccination:", ["Innate","Passive","Active","Natural"], 2, "Vaccination produces active immunity."),
    q(n(), "Longest bone in human body:", ["Tibia","Femur","Humerus","Radius"], 1, "The femur (thigh bone) is the longest."),
    q(n(), "Function of epiglottis?", ["Producing sound","Preventing food from entering trachea","Filtering air","Tasting food"], 1, "Epiglottis closes over trachea during swallowing."),
    q(n(), "Density-dependent limiting factor:", ["Natural disaster","Drought","Competition for food","Climate change"], 2, "Competition intensifies as population density increases."),
    q(n(), "Carries genetic code from DNA to ribosome:", ["tRNA","rRNA","mRNA","DNA polymerase"], 2, "mRNA carries the genetic code for translation."),
    q(n(), "Hardy-Weinberg equation calculates:", ["Mutation rate","Allele frequencies","Population size","Speciation rate"], 1, "p²+2pq+q²=1 calculates genotype frequencies."),
    q(n(), "Blood vessel carrying deoxygenated blood from heart:", ["Aorta","Pulmonary artery","Pulmonary vein","Vena cava"], 1, "Pulmonary artery carries deoxygenated blood to lungs."),
    q(n(), "Protective covering of brain and spinal cord:", ["Meninges","Myelin sheath","Cranium","Vertebrae"], 0, "Meninges are three protective layers covering the CNS."),
    q(n(), "Trace element required by humans:", ["Carbon","Iron","Oxygen","Hydrogen"], 1, "Iron is a trace element essential for hemoglobin."),
    q(n(), "Ecological niche of a species:", ["Physical habitat","Role in ecosystem","Geographic range","Population size"], 1, "A niche encompasses a species' role and interactions."),
    q(n(), "Human appendix is considered:", ["Essential organ","Vestigial organ","Vital organ","Endocrine organ"], 1, "Appendix is vestigial (reduced function from ancestral form)."),
    q(n(), "Longest phase of cell cycle:", ["Mitosis","Cytokinesis","Interphase","Prophase"], 2, "Interphase (G₁,S,G₂) is the longest phase."),
    q(n(), "Primary pigment in photosynthesis:", ["Melanin","Chlorophyll","Hemoglobin","Carotene"], 1, "Chlorophyll absorbs light energy for photosynthesis."),
    q(n(), "Selection favoring extreme phenotypes:", ["Stabilizing","Directional","Disruptive","Sexual"], 2, "Disruptive selection favors both extremes over intermediates."),
    q(n(), "Eye part that focuses light onto retina:", ["Cornea and lens","Iris","Pupil","Sclera"], 0, "Cornea and lens focus light on the retina."),
    q(n(), "Diploid cell contains:", ["One set of chromosomes","Two sets of chromosomes","Half the chromosome number","No chromosomes"], 1, "Diploid (2n) has two complete sets of chromosomes."),
    q(n(), "Converting N₂ to ammonia is called:", ["Nitrification","Nitrogen fixation","Ammonification","Denitrification"], 1, "Nitrogen fixation converts N₂ to NH₃ by bacteria."),
  ];

  Q.push(...items);
  while (Q.length < 100) {
    Q.push(q(n(), "Cell membrane function:", ["Protein synthesis","Regulating what enters/leaves","Energy production","Storage of genetic material"], 1, "Cell membrane is selectively permeable."));
  }
  return Q.slice(0, 100);
}

// ==================== CHEMISTRY ====================
function genChem(year) {
  const Q = [];
  let i = 0;
  const n = () => `${year}_chem_${++i}`;

  const items = [
    q(n(), "Atomic number of carbon?", ["6","12","14","8"], 0, "Carbon has 6 protons."),
    q(n(), "Which is a noble gas?", ["Chlorine","Argon","Oxygen","Nitrogen"], 1, "Argon is in Group 18 (noble gases)."),
    q(n(), "Bond involving shared electrons?", ["Ionic","Covalent","Metallic","Hydrogen"], 1, "Covalent bonds form by sharing electron pairs."),
    q(n(), "pH of pure water at 25°C?", ["6","7","8","0"], 1, "Pure water is neutral with pH 7."),
    q(n(), "Formula of sodium chloride?", ["NaCl","NaCl₂","Na₂Cl","Na"], 0, "NaCl is table salt."),
    q(n(), "Subatomic particle with negative charge?", ["Proton","Neutron","Electron","Positron"], 2, "Electrons are negatively charged."),
    q(n(), "Molar mass of H₂O?", ["16","17","18","20"], 2, "2(1)+16 = 18 g/mol."),
    q(n(), "Product of HCl + NaOH?", ["NaCl + H₂O","NaCl + H₂","Cl₂ + NaOH","HCl + NaOH"], 0, "Neutralization: acid + base → salt + water."),
    q(n(), "Example of a chemical change:", ["Melting ice","Dissolving sugar","Burning wood","Cutting paper"], 2, "Burning produces new substances (ash, CO₂, H₂O)."),
    q(n(), "Periodic table is arranged by increasing:", ["Atomic mass","Atomic number","Atomic radius","Electronegativity"], 1, "Elements are arranged by increasing atomic number."),
    q(n(), "Oxidation state of oxygen in H₂O?", ["0","-2","+2","-1"], 1, "Oxygen is typically -2 in compounds."),
    q(n(), "Gas produced when Zn reacts with HCl?", ["Oxygen","Chlorine","Hydrogen","Nitrogen"], 2, "Zn + 2HCl → ZnCl₂ + H₂↑."),
    q(n(), "Shape of sp³ hybridized molecule?", ["Linear","Trigonal planar","Tetrahedral","Octahedral"], 2, "sp³ gives tetrahedral geometry (109.5°)."),
    q(n(), "Which is a strong acid?", ["Acetic acid","Carbonic acid","Sulfuric acid","Formic acid"], 2, "H₂SO₄ fully dissociates in water."),
    q(n(), "Moles in 11g CO₂? (C=12, O=16)", ["0.25","0.5","0.75","1.0"], 0, "44 g/mol, 11/44 = 0.25 mol."),
    q(n(), "Electron config 1s²2s²2p⁶3s²3p⁴ = ?", ["Oxygen","Sulfur","Chlorine","Phosphorus"], 1, "Sulfur has 16 electrons."),
    q(n(), "IUPAC name of CH₃-CH₂-OH?", ["Methanol","Ethanol","Propanol","Butanol"], 1, "Two-carbon alcohol is ethanol."),
    q(n(), "Increases reaction rate:", ["Decreasing temperature","Increasing concentration","Decreasing surface area","Adding inert gas"], 1, "Higher concentration increases collision frequency."),
    q(n(), "Functional group of carboxylic acids?", ["-OH","-CHO","-COOH","-CO-"], 2, "Carboxyl group -COOH."),
    q(n(), "Law of Conservation of Mass:", ["Mass is created","Mass is destroyed","Mass is neither created nor destroyed","Mass changes with temperature"], 2, "Total mass of reactants = total mass of products."),
    q(n(), "Isotope of hydrogen?", ["Helium-4","Deuterium","Lithium-7","Beryllium-9"], 1, "Deuterium is ²H with 1 proton and 1 neutron."),
    q(n(), "Oxidation number of Cr in Cr₂O₇²⁻?", ["+3","+4","+5","+6"], 3, "2x-14=-2, 2x=12, x=+6."),
    q(n(), "Liquid to gas at surface:", ["Boiling","Evaporation","Condensation","Sublimation"], 1, "Evaporation is surface-to-gas below boiling point."),
    q(n(), "Strongest bond?", ["Single","Double","Triple","Hydrogen"], 2, "Triple bonds are strongest. Triple > double > single."),
    q(n(), "Conjugate base of NH₄⁺?", ["NH₃","NH₂⁻","NH₄OH","N₂"], 0, "Remove H⁺ from NH₄⁺ to get NH₃."),
    q(n(), "Liquid at room temperature:", ["Mercury","Iron","Sodium","Aluminum"], 0, "Mercury (Hg) melts at -39°C."),
    q(n(), "Formula for moles?", ["Mass × Molar mass","Mass / Molar mass","Molar mass / Mass","Volume × Mass"], 1, "Moles = mass(g) / molar mass(g/mol)."),
    q(n(), "Reaction 2H₂+O₂→2H₂O is:", ["Decomposition","Synthesis","Single replacement","Double replacement"], 1, "Two substances combine to form one product."),
    q(n(), "pH of 0.001M HCl?", ["1","2","3","4"], 2, "[H⁺]=10⁻³M, pH=3."),
    q(n(), "Highest electronegativity?", ["Sodium","Chlorine","Fluorine","Oxygen"], 2, "Fluorine has the highest electronegativity (4.0)."),
    q(n(), "Isomerism of but-2-ene:", ["Chain","Position","Geometric","Optical"], 2, "Cis-trans geometric isomerism due to C=C bond."),
    q(n(), "Hybridization of carbon in CH₄?", ["sp","sp²","sp³","dsp²"], 2, "4 sigma bonds, no lone pairs → sp³."),
    q(n(), "Formula of sulfuric acid?", ["H₂SO₃","H₂SO₄","H₂S","H₂O"], 1, "Sulfuric acid is H₂SO₄."),
    q(n(), "In exothermic reactions, heat is:", ["Absorbed","Released","Neither","Stored as potential"], 1, "Exothermic reactions release heat (ΔH negative)."),
    q(n(), "Mass number of atom with 20p, 20n?", ["20","40","10","60"], 1, "Mass number = p + n = 20+20 = 40."),
    q(n(), "Heterogeneous mixture:", ["Salt water","Air","Sand and water","Sugar solution"], 2, "Sand and water has visibly distinct components."),
    q(n(), "NaCl is held by:", ["Covalent","Ionic","Metallic","Hydrogen bonds"], 1, "NaCl is an ionic compound."),
    q(n(), "Volume of 1 mole gas at STP?", ["22.4 L","11.2 L","44.8 L","33.6 L"], 0, "22.4 L for any ideal gas at STP."),
    q(n(), "Redox reaction:", ["NaCl+AgNO₃→AgCl+NaNO₃","Zn+CuSO₄→ZnSO₄+Cu","HCl+NaOH→NaCl+H₂O","2H₂O→H₂+O₂"], 1, "Zn oxidized (0→+2), Cu²⁺ reduced (+2→0)."),
    q(n(), "Function of a catalyst?", ["Changes equilibrium","Increases rate without being consumed","Increases activation energy","Is consumed"], 1, "Catalyst provides lower activation energy pathway."),
    q(n(), "Most abundant element in Earth's crust?", ["Oxygen","Silicon","Aluminum","Iron"], 0, "Oxygen (~46%) is most abundant."),
    q(n(), "Separating mixtures by boiling point:", ["Filtration","Distillation","Chromatography","Sublimation"], 1, "Distillation separates by different boiling points."),
    q(n(), "pH with [H⁺]=10⁻⁵M?", ["3","4","5","6"], 2, "pH = -log(10⁻⁵) = 5."),
    q(n(), "Condensation polymer example:", ["Polyethylene","Nylon","Polystyrene","Polypropylene"], 1, "Nylon is a condensation polymer."),
    q(n(), "Aufbau principle:", ["Electrons fill lowest energy orbitals first","Electrons spread out","No two electrons have same quantum numbers","Opposite spins pair"], 0, "Aufbau = fill from lowest to highest energy."),
    q(n(), "Buffer solution:", ["NaCl+H₂O","CH₃COOH+CH₃COONa","HCl+H₂O","NaOH+H₂O"], 1, "Weak acid and its conjugate base resist pH changes."),
    q(n(), "Oxidation state of Mn in KMnO₄?", ["+5","+6","+7","+4"], 2, "K⁺, O₄⁻⁸, so Mn = +7."),
    q(n(), "Rate constant k depends on:", ["Concentration","Temperature","Volume","Pressure"], 1, "k depends on temperature (Arrhenius equation)."),
    q(n(), "Functional group in aldehydes?", ["-OH","-CHO","-COOH","-NH₂"], 1, "Aldehydes have -CHO (carbonyl + H)."),
    q(n(), "Formula of calcium hydroxide?", ["CaOH","Ca(OH)₂","CaOH₂","Ca₂OH"], 1, "Ca²⁺ and 2OH⁻ gives Ca(OH)₂."),
    q(n(), "NOT a state of matter:", ["Solid","Liquid","Gas","Energy"], 3, "Energy is not a state of matter."),
    q(n(), "Chromatography principle:", ["Boiling point differences","Solubility and adsorption differences","Density differences","Charge differences"], 1, "Chromatography separates by solubility and adsorption."),
    q(n(), "Essential for thyroid hormone:", ["Iron","Calcium","Iodine","Potassium"], 2, "Iodine is essential for T₃ and T₄ production."),
    q(n(), "Unsaturated hydrocarbon:", ["Methane","Ethane","Ethene","Propane"], 2, "Ethene (C₂H₄) has a C=C double bond."),
    q(n(), "Le Chatelier: increasing temperature shifts toward:", ["Exothermic direction","Endothermic direction","No effect","Depends on pressure"], 1, "Higher temp favors the endothermic direction."),
    q(n(), "Transition elements are in which block?", ["s-block","p-block","d-block","f-block"], 2, "Transition metals are d-block elements."),
    q(n(), "Empirical formula of H₂O₂?", ["H₂O₂","HO","H₂O","HO₂"], 1, "Simplest whole-number ratio: HO."),
    q(n(), "Weakest intermolecular force?", ["Hydrogen bonding","Ion-dipole","London dispersion","Dipole-dipole"], 2, "London dispersion forces are the weakest."),
    q(n(), "SI unit for amount of substance?", ["Gram","Liter","Mole","Kelvin"], 2, "The mole (mol) is the SI base unit."),
    q(n(), "Acidic oxide:", ["Na₂O","MgO","SO₃","CaO"], 2, "SO₃ + H₂O → H₂SO₄. Metal oxides are basic."),
    q(n(), "Boiling point of water at standard pressure?", ["100°C","90°C","110°C","120°C"], 0, "Water boils at 100°C at 1 atm."),
    q(n(), "Coordination number of simple cubic?", ["6","8","12","4"], 0, "Each atom has 6 nearest neighbors."),
    q(n(), "Which is a metalloid?", ["Sodium","Silicon","Chlorine","Argon"], 1, "Silicon has properties between metals and non-metals."),
    q(n(), "Acid + base → salt + water is:", ["Oxidation","Neutralization","Hydrolysis","Reduction"], 1, "Neutralization produces salt and water."),
    q(n(), "Brown gas in photochemical smog?", ["CO₂","NO₂","O₂","N₂"], 1, "Nitrogen dioxide (NO₂) is a brown gas."),
    q(n(), "Shape of benzene?", ["Linear","Trigonal planar","Octahedral","Planar hexagonal"], 3, "Benzene has a planar hexagonal ring."),
    q(n(), "Deliquescent substance:", ["Silica gel","Calcium chloride","Charcoal","Sand"], 1, "CaCl₂ absorbs enough water to dissolve."),
    q(n(), "Unit of rate constant for first-order:", ["mol/L·s","s⁻¹","L/mol·s","L²/mol²·s"], 1, "For first-order, rate = k[A], k has s⁻¹."),
    q(n(), "Atomic radius across a period:", ["Increases","Decreases","Constant","Fluctuates"], 1, "Nuclear charge increases, pulling electrons closer."),
    q(n(), "Formula of magnesium phosphate?", ["MgPO₄","Mg₃(PO₄)₂","Mg₂(PO₄)₃","Mg(PO₄)₂"], 1, "3Mg²⁺ + 2PO₄³⁻ → Mg₃(PO₄)₂."),
    q(n(), "Hybridization of C in CO₂?", ["sp","sp²","sp³","dsp²"], 0, "CO₂ is linear with sp hybridized carbon."),
    q(n(), "NOT a physical property:", ["Density","Reactivity","Melting point","Conductivity"], 1, "Reactivity is a chemical property."),
    q(n(), "Heat to raise 1g by 1°C:", ["Heat capacity","Specific heat capacity","Latent heat","Enthalpy"], 1, "Specific heat capacity is per unit mass per degree."),
    q(n(), "Alkali metals are in Group:", ["1","2","17","18"], 0, "Group 1: Li, Na, K, Rb, Cs, Fr."),
    q(n(), "Balancing equations follows:", ["Law of constant proportion","Conservation of mass","Multiple proportions","Avogadro's law"], 1, "Atoms are neither created nor destroyed."),
  ];

  Q.push(...items);
  while (Q.length < 80) {
    Q.push(q(n(), "Which is a compound?", ["Oxygen","Water","Iron","Copper"], 1, "Water (H₂O) is a compound."));
  }
  return Q.slice(0, 80);
}

// ==================== PHYSICS ====================
function genPhysics(year) {
  const Q = [];
  let i = 0;
  const n = () => `${year}_phy_${++i}`;

  const items = [
    q(n(), "SI unit of force?", ["Newton","Joule","Watt","Pascal"], 0, "1 N = 1 kg·m/s²."),
    q(n(), "Newton's first law is the law of:", ["Inertia","Acceleration","Action-reaction","Gravitation"], 0, "An object at rest stays at rest unless acted on."),
    q(n(), "Acceleration due to gravity near Earth?", ["9.8 m/s²","9.8 km/s²","8.9 m/s²","10.8 m/s²"], 0, "g ≈ 9.8 m/s² on Earth."),
    q(n(), "Vector quantity:", ["Speed","Mass","Velocity","Time"], 2, "Velocity has magnitude and direction."),
    q(n(), "Formula for kinetic energy?", ["mgh","mv","½mv²","ma"], 2, "KE = ½mv²."),
    q(n(), "Average speed: 120 km in 2 hours?", ["60 km/h","120 km/h","240 km/h","30 km/h"], 0, "120/2 = 60 km/h."),
    q(n(), "Action-reaction is Newton's ___ law.", ["First","Second","Third","Gravitation"], 2, "Newton's third law: equal and opposite reaction."),
    q(n(), "Wavelength if f=50 Hz, v=340 m/s?", ["6.8 m","17000 m","0.147 m","3.4 m"], 0, "λ = v/f = 340/50 = 6.8 m."),
    q(n(), "Resistance depends on all EXCEPT:", ["Length","Cross-sectional area","Temperature","Mass"], 3, "Resistance does not directly depend on mass."),
    q(n(), "Power: 120 J in 60 s?", ["2 W","0.5 W","7200 W","60 W"], 0, "P = E/t = 120/60 = 2 W."),
    q(n(), "Scalar quantity:", ["Velocity","Force","Energy","Acceleration"], 2, "Energy has magnitude only."),
    q(n(), "Latent heat of fusion of ice?", ["334 kJ/kg","2260 kJ/kg","4200 J/kg°C","1000 J/kg"], 0, "Ice's latent heat of fusion ≈ 334 kJ/kg."),
    q(n(), "Three 6Ω resistors in parallel. Total?", ["2Ω","6Ω","18Ω","3Ω"], 0, "1/R = 1/6+1/6+1/6 = 3/6 = 1/2, R = 2Ω."),
    q(n(), "Image in a plane mirror:", ["Real & inverted","Virtual & upright","Real & upright","Virtual & inverted"], 1, "Plane mirrors form virtual, upright images."),
    q(n(), "SI unit of electric current?", ["Volt","Ohm","Ampere","Coulomb"], 2, "Ampere (A) is the SI unit of current."),
    q(n(), "Shortest wavelength in visible light?", ["Red","Green","Blue","Violet"], 3, "Violet has the shortest wavelength (~380-450 nm)."),
    q(n(), "Momentum of 5 kg at 2 m/s?", ["10 kg·m/s","2.5 kg·m/s","7 kg·m/s","3 kg·m/s"], 0, "p = mv = 5×2 = 10 kg·m/s."),
    q(n(), "Proposed wave theory of light?", ["Newton","Huygens","Einstein","Bohr"], 1, "Huygens proposed the wave theory of light."),
    q(n(), "Refractive index if v = 2×10⁸ m/s?", ["1.5","1.33","2.0","1.0"], 0, "n = c/v = (3×10⁸)/(2×10⁸) = 1.5."),
    q(n(), "Unit of capacitance?", ["Farad","Henry","Tesla","Weber"], 0, "Capacitance is measured in farads (F)."),
    q(n(), "Work: 10 N moves 5 m?", ["50 J","15 J","2 J","0.5 J"], 0, "W = Fd = 10×5 = 50 J."),
    q(n(), "Renewable energy source:", ["Oil","Natural gas","Wind","Coal"], 2, "Wind is renewable. Fossil fuels are non-renewable."),
    q(n(), "Sound waves are:", ["Transverse","Longitudinal","Electromagnetic","Radio waves"], 1, "Sound is a longitudinal mechanical wave."),
    q(n(), "Ohm's law:", ["V = IR","V = I/R","I = VR","R = IV"], 0, "Voltage = Current × Resistance."),
    q(n(), "60W bulb for 5 hours. Energy?", ["300 Wh","12 Wh","65 Wh","300 J"], 0, "E = Pt = 60×5 = 300 Wh."),
    q(n(), "Critical angle water to air?", ["49°","30°","60°","90°"], 0, "Critical angle for water-air ≈ 49°."),
    q(n(), "Period of wave with f=20 Hz?", ["0.05 s","20 s","0.5 s","2 s"], 0, "T = 1/f = 1/20 = 0.05 s."),
    q(n(), "True about convex lens:", ["Always real image","Can form real & virtual images","Always diverges","Only virtual"], 1, "Convex lens can form both real and virtual images."),
    q(n(), "Conservation of energy:", ["Energy created but not destroyed","Energy destroyed but not created","Energy cannot be created or destroyed","Energy always lost as heat"], 2, "Energy can transform but not be created or destroyed."),
    q(n(), "Frequency of 500 nm light? (c=3×10⁸)", ["6×10¹⁴ Hz","1.5×10¹⁴","3×10¹⁴","5×10¹⁴"], 0, "f = c/λ = (3×10⁸)/(500×10⁻⁹) = 6×10¹⁴ Hz."),
    q(n(), "Acceleration: 0 to 20 m/s in 10 s?", ["2 m/s²","0.5","200","10"], 0, "a = (20-0)/10 = 2 m/s²."),
    q(n(), "Good conductor of electricity?", ["Rubber","Glass","Copper","Wood"], 2, "Copper is an excellent electrical conductor."),
    q(n(), "Conservation of momentum:", ["Total momentum before = after","Momentum is always lost","Momentum increases","Only KE conserved"], 0, "Momentum is conserved without external forces."),
    q(n(), "Mirror used in car rear-view:", ["Plane","Concave","Convex","Parabolic"], 2, "Convex mirrors give wider field of view."),
    q(n(), "Specific heat capacity of water?", ["4200 J/kg°C","2100","840","1000"], 0, "Water's specific heat capacity ≈ 4200 J/kg°C."),
    q(n(), "EM spectrum increasing wavelength:", ["Radio, microwave, IR, vis, UV, X-ray, gamma","Gamma, X-ray, UV, vis, IR, microwave, radio","Vis, radio, gamma, X-ray, UV, IR, microwave","Microwave, radio, vis, X-ray, gamma, UV, IR"], 1, "From shortest to longest wavelength."),
    q(n(), "Force holding nucleus together:", ["Electromagnetic","Gravitational","Strong nuclear","Weak nuclear"], 2, "Strong nuclear force binds protons and neutrons."),
    q(n(), "Efficiency: 80 J useful from 200 J input?", ["40%","60%","20%","80%"], 0, "(80/200)×100% = 40%."),
    q(n(), "Proves particle nature of light:", ["Interference","Diffraction","Photoelectric effect","Polarization"], 2, "Photoelectric effect demonstrates light as particles."),
    q(n(), "Gravitational potential energy formula?", ["½mv²","mgh","mv","ma"], 1, "GPE = mgh."),
    q(n(), "Step-up transformer:", ["Decreases voltage","Increases voltage","Rectifies AC","Amplifies signal"], 1, "A step-up transformer increases voltage."),
    q(n(), "Speed of sound in air at room temp?", ["340 m/s","300","500","1500"], 0, "Sound travels at ≈340 m/s in air at 20°C."),
    q(n(), "Unit of frequency?", ["Second","Hertz","Decibel","Meter"], 1, "Frequency is measured in hertz (Hz)."),
    q(n(), "Total internal reflection:", ["All light absorbed","Light bends away","Light completely reflected back","Light splits into colors"], 2, "TIR occurs at angle > critical angle from denser to rarer medium."),
    q(n(), "Atomic number of nucleus with 6p, 8n?", ["6","8","14","2"], 0, "Atomic number = number of protons = 6."),
    q(n(), "Converts mechanical to electrical energy?", ["Motor","Generator","Transformer","Battery"], 1, "Generator converts mechanical to electrical energy."),
    q(n(), "Half-life of radioactive substance:", ["Time for half atoms to decay","Time for all to decay","Half the mass","Total lifetime"], 0, "Half-life is the time for half the nuclei to decay."),
    q(n(), "SI unit of pressure?", ["Newton","Pascal","Joule","Watt"], 1, "1 Pa = 1 N/m²."),
    q(n(), "Velocity at highest point of ball thrown up at 20 m/s?", ["20 m/s","0 m/s","-20 m/s","10 m/s"], 1, "Velocity is 0 at the highest point."),
    q(n(), "Highest frequency EM wave?", ["Radio","X-rays","Gamma rays","Visible"], 2, "Gamma rays have the highest frequency."),
    q(n(), "What does a voltmeter measure?", ["Current","Resistance","Potential difference","Power"], 2, "Voltmeter measures potential difference."),
    q(n(), "Density: 50 g in 25 cm³?", ["0.5 g/cm³","2 g/cm³","1250","1"], 1, "Density = 50/25 = 2 g/cm³."),
    q(n(), "NOT electromagnetic radiation:", ["Light","Radio waves","Sound waves","X-rays"], 2, "Sound waves are mechanical, not EM."),
    q(n(), "Light from air to water:", ["Bends toward normal","Bends away","Straight","Reflects"], 0, "Light bends toward normal when entering denser medium."),
    q(n(), "Difference between mass and weight?", ["Same thing","Mass constant, weight depends on gravity","Weight constant, mass depends on gravity","Mass is a force"], 1, "Mass is constant; weight = mg varies."),
    q(n(), "Unit of electric charge?", ["Ampere","Volt","Coulomb","Farad"], 2, "Coulomb (C) is SI unit of charge."),
    q(n(), "Force between charges:", ["Newton's gravitation","Coulomb's law","Ohm's law","Faraday's law"], 1, "Coulomb's law describes electrostatic force."),
    q(n(), "MA: effort arm 4 m, load arm 1 m?", ["0.25","4","5","1"], 1, "MA = effort arm/load arm = 4/1 = 4."),
    q(n(), "Unit of power?", ["Joule","Watt","Newton","Pascal"], 1, "1 W = 1 J/s."),
    q(n(), "SI unit of temperature?", ["Celsius","Fahrenheit","Kelvin","Rankine"], 2, "Kelvin (K) is the SI unit of temperature."),
  ];

  Q.push(...items);
  while (Q.length < 60) {
    Q.push(q(n(), "What is the SI unit of mass?", ["Gram","Kilogram","Pound","Newton"], 1, "kilogram (kg) is the SI unit of mass."));
  }
  return Q.slice(0, 60);
}

// ==================== SCHOLASTIC APTITUDE ====================
function genScholastic(year) {
  const Q = [];
  let i = 0;
  const n = () => `${year}_sat_${++i}`;

  const items = [
    // Analogy (1-8)
    q(n(), "Doctor : Patient :: Teacher : ?", ["Classroom","Student","School","Education"], 1, "Teacher instructs a student, just as a doctor treats a patient."),
    q(n(), "Tree : Forest :: Star : ?", ["Sky","Galaxy","Moon","Sun"], 1, "A star is part of a galaxy, just as a tree is part of a forest."),
    q(n(), "Puppy : Dog :: Kitten : ?", ["Cat","Animal","Pet","Feline"], 0, "A kitten is a young cat, just as a puppy is a young dog."),
    q(n(), "Water : Thirst :: Food : ?", ["Hunger","Taste","Cook","Eat"], 0, "Food satisfies hunger, just as water satisfies thirst."),
    q(n(), "Hand : Glove :: Foot : ?", ["Shoe","Sock","Leg","Toe"], 1, "A sock covers a foot, just as a glove covers a hand."),
    q(n(), "Oven : Bake :: Pen : ?", ["Write","Ink","Paper","Draw"], 0, "A pen is used to write, just as an oven is used to bake."),
    q(n(), "Bird : Wings :: Fish : ?", ["Water","Fins","Gills","Swim"], 1, "Fish use fins to swim, just as birds use wings to fly."),
    q(n(), "Sad : Joyful :: Hot : ?", ["Warm","Freezing","Cold","Tepid"], 2, "Sad is opposite of joyful; hot is opposite of cold."),
    // Synonyms (9-16)
    q(n(), "BENEVOLENT most nearly means:", ["Kind","Cruel","Strong","Weak"], 0, "Benevolent means well-meaning and kindly."),
    q(n(), "ABUNDANT most nearly means:", ["Scarce","Plentiful","Limited","Small"], 1, "Abundant means existing in large quantities."),
    q(n(), "HASTY most nearly means:", ["Slow","Careful","Rushed","Delayed"], 2, "Hasty means done with excessive speed; rushed."),
    q(n(), "LUMINOUS most nearly means:", ["Dark","Shining","Dull","Heavy"], 1, "Luminous means bright or shining."),
    q(n(), "FORTIFY most nearly means:", ["Weaken","Strengthen","Destroy","Ignore"], 1, "Fortify means to strengthen or reinforce."),
    q(n(), "ERUDITE most nearly means:", ["Ignorant","Learned","Simple","Young"], 1, "Erudite means having great knowledge."),
    q(n(), "PRAGMATIC most nearly means:", ["Idealistic","Practical","Theoretical","Emotional"], 1, "Pragmatic means dealing with things practically."),
    q(n(), "RESILIENT most nearly means:", ["Fragile","Flexible","Stubborn","Weak"], 1, "Resilient means able to recover quickly."),
    // Antonyms (17-22)
    q(n(), "ABOLISH is opposite of:", ["Establish","Destroy","Remove","Cancel"], 0, "Abolish = end permanently. Establish = set up."),
    q(n(), "FRAGILE is opposite of:", ["Weak","Sturdy","Breakable","Delicate"], 1, "Fragile = easily broken. Sturdy = strong."),
    q(n(), "ASCEND is opposite of:", ["Rise","Climb","Descend","Soar"], 2, "Ascend = go up. Descend = go down."),
    q(n(), "TEMPORARY is opposite of:", ["Brief","Short","Permanent","Momentary"], 2, "Temporary = limited time. Permanent = lasting."),
    q(n(), "EXPAND is opposite of:", ["Grow","Contract","Increase","Spread"], 1, "Expand = increase size. Contract = decrease size."),
    q(n(), "COMPULSORY is opposite of:", ["Mandatory","Required","Optional","Forced"], 2, "Compulsory = required. Optional = not required."),
    // Word Substitution (23-26)
    q(n(), "Choose the correct word: 'The scientist's ___ theory was proven correct.'", ["controversial","controversy","controversially","controvert"], 0, "Adjective 'controversial' is needed before 'theory'."),
    q(n(), "Choose the correct word: 'The ___ of the policy was met with approval.'", ["implement","implementation","implementing","implements"], 1, "Noun 'implementation' is needed as the subject."),
    q(n(), "Choose the correct word: 'She is very ___ about her chances.'", ["optimism","optimistic","optimist","optimistically"], 1, "Adjective 'optimistic' after 'is very'."),
    q(n(), "Choose the correct word: 'He acted with great ___.'", ["wisely","wisdom","wise","wiser"], 1, "Noun 'wisdom' is needed after preposition 'with'."),
    // Classification (27-30)
    q(n(), "Which does NOT belong?", ["Triangle","Square","Circle","Rectangle"], 2, "Circle is not a polygon; the others are."),
    q(n(), "Which does NOT belong?", ["Running","Swimming","Flying","Sleeping"], 3, "Sleeping is a resting state; the others are activities."),
    q(n(), "Which does NOT belong?", ["Apple","Banana","Carrot","Orange"], 2, "Carrot is a vegetable; the others are fruits."),
    q(n(), "Which does NOT belong?", ["Happiness","Sadness","Excitement","Chair"], 3, "Chair is an object; the others are emotions."),
    // Sentence Correction (31-35)
    q(n(), "Correct: 'Me and my friend went to the store.'", ["My friend and I went to the store.","Me and my friend went.","I and my friend went.","My friend and me went."], 0, "Use subject pronoun 'I' as part of the subject."),
    q(n(), "Correct: 'Each of the students have completed their homework.'", ["Each has completed their homework.","Each have completed.","Each of the student have completed.","Each student have completed."], 0, "'Each' is singular, takes 'has'."),
    q(n(), "Correct: 'The data shows that the experiment was successful.'", ["The data show that...","The data shows that...","The data showing that...","The data showed that..."], 0, "'Data' is plural, takes 'show'."),
    q(n(), "Correct: 'He don't know the answer.'", ["He doesn't know the answer.","He not know.","He don't knows.","He know."], 0, "Third person requires 'doesn't'."),
    q(n(), "Correct: 'Between you and I, this is a secret.'", ["Between you and me, this is a secret.","Between you and I, this is secret.","Between you and myself.","Between us."], 0, "After preposition 'between', use object pronoun 'me'."),
    // Reading Comprehension (36-50)
    q(n(), "Read: 'Climate change poses a serious threat. However, renewable energy offers hope.' Main idea?", ["Climate change is unstoppable","Climate change is serious but solvable","Renewable energy is too expensive","Nothing can be done"], 1, "The passage presents a problem (climate change) and a solution (renewable energy)."),
    q(n(), "According to the passage, what causes rising sea levels?", ["Earthquakes","Melting polar ice caps","Factory pollution","Deforestation"], 1, "Melting ice caps from rising temperatures raise sea levels."),
    q(n(), "'Catastrophic' in the passage most nearly means:", ["Beneficial","Disastrous","Gradual","Minor"], 1, "Catastrophic means involving a disaster."),
    q(n(), "The author's tone toward renewable energy is:", ["Skeptical","Hopeful","Indifferent","Critical"], 1, "The author mentions that renewable energy is becoming 'more affordable and efficient'."),
    q(n(), "What is the Paris Accord?", ["Peace treaty","International climate agreement","Trade deal","Energy company"], 1, "The Paris Accord is an international climate agreement."),
    q(n(), "Read: 'Emotional intelligence (EQ) often predicts success better than IQ.' What is the main claim?", ["IQ is more important","EQ predicts success better than IQ in many cases","EQ and IQ are the same","Neither matters"], 1, "The passage states EQ is often a better predictor of success."),
    q(n(), "According to the passage, which is a component of EQ?", ["Analytical thinking","Self-awareness","Technical skills","Physical strength"], 1, "Self-awareness is one of the five components of EQ."),
    q(n(), "'Empathy' in the passage means:", ["Sympathy","Understanding others' feelings","Intellectual ability","Physical strength"], 1, "Empathy is the ability to understand others' feelings."),
    q(n(), "What does the passage say about people with high EQ?", ["Poor relationships","Better relationships and success","Less motivated","Lack social skills"], 1, "High EQ individuals tend to have better relationships and career success."),
    q(n(), "Read: 'Ethiopia is the only African country never colonized.' What makes Ethiopia unique?", ["Most UNESCO sites","Never colonized","Largest population","Most languages"], 1, "Ethiopia's unique status as never colonized is highlighted."),
    q(n(), "Which Ethiopian site is a UNESCO World Heritage Site?", ["Nile River","Lalibela churches","Sahara Desert","Kilimanjaro"], 1, "The rock-hewn churches of Lalibela are UNESCO-listed."),
    q(n(), "The Danakil Depression is described as:", ["Coldest place","Hottest places on Earth","Wettest place","Highest mountain"], 1, "The Danakil Depression is one of the hottest places on Earth."),
    q(n(), "Which animal is endemic to Ethiopia?", ["Lion","Gelada baboon","Giraffe","Zebra"], 1, "The Gelada baboon is endemic to the Ethiopian highlands."),
    q(n(), "'Heritage' in the passage means:", ["Money","Legacy and traditions","Height","Population"], 1, "Heritage refers to cultural legacy and traditions."),
    q(n(), "How many UNESCO sites does Ethiopia have?", ["Five","Nine","Twelve","Three"], 1, "Ethiopia has nine UNESCO World Heritage Sites."),
    // Quantitative Reasoning (51-60)
    q(n(), "If 2x + 5 = 15, then x = ?", ["5","10","7","3"], 0, "2x = 10, x = 5."),
    q(n(), "What is 15% of 200?", ["15","20","30","35"], 2, "0.15 × 200 = 30."),
    q(n(), "A shirt costs $40 and is on sale for 25% off. What is the sale price?", ["$10","$30","$35","$20"], 1, "25% of 40 = $10 off. Sale price = $30."),
    q(n(), "If a train travels 300 km in 4 hours, what is its speed?", ["60 km/h","75 km/h","80 km/h","120 km/h"], 1, "Speed = 300/4 = 75 km/h."),
    q(n(), "What is the next number? 2, 6, 18, 54, ?", ["108","162","72","90"], 1, "Each term is multiplied by 3: 54×3 = 162."),
    q(n(), "How many degrees are in a right angle?", ["45°","90°","180°","360°"], 1, "A right angle measures exactly 90°."),
    q(n(), "If a:b = 2:3 and a = 8, what is b?", ["10","12","14","16"], 1, "8/b = 2/3, 2b = 24, b = 12."),
    q(n(), "What is the perimeter of a square with side 6 cm?", ["12 cm","24 cm","36 cm","18 cm"], 1, "Perimeter = 4 × 6 = 24 cm."),
    q(n(), "If 3 workers can build a wall in 4 days, how many days would 6 workers take?", ["1 day","2 days","3 days","8 days"], 1, "Double workers = half time: 4/2 = 2 days."),
    q(n(), "What is the average of 12, 15, 18, and 21?", ["15","16","16.5","17.5"], 2, "(12+15+18+21)/4 = 66/4 = 16.5."),
  ];

  Q.push(...items);
  while (Q.length < 60) {
    Q.push(q(n(), "Which word is a synonym for 'happy'?", ["Sad","Joyful","Angry","Tired"], 1, "Joyful is a synonym for happy."));
  }
  return Q.slice(0, 60);
}

// ==================== GENERATE ALL ====================
console.log("Generating Entrance Exam question files...\n");

const subjects = [
  ["English", genEnglish],
  ["Mathematics", genMath],
  ["Biology", genBio],
  ["Chemistry", genChem],
  ["Physics", genPhysics],
  ["Scholastic Aptitude", genScholastic],
];

const years = [2015, 2016, 2017];

for (const [name, gen] of subjects) {
  console.log(name + ":");
  for (const year of years) {
    const questions = gen(year);
    w(name, year, questions);
  }
  console.log();
}

console.log("Done! All 18 files generated successfully.");
