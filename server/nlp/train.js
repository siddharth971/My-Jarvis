const fs = require("fs");
const path = require("path");
const brain = require("brain.js");

const dataPath = path.join(__dirname, "training-data.json");
const modelPath = path.join(__dirname, "model.json");
const vocabPath = path.join(__dirname, "vocab.json");

const raw = fs.readFileSync(dataPath, "utf8");
const intents = JSON.parse(raw);

// -------------------------
// 1. Build vocabulary
// -------------------------
const vocabSet = new Set();

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter(Boolean);
}

intents.forEach(i => {
  i.utterances.forEach(u => {
    tokenize(u).forEach(token => vocabSet.add(token));
  });
});

const vocab = Array.from(vocabSet);

// -------------------------
// 2. Convert text → features
// -------------------------
function textToFeatures(text) {
  const tokens = tokenize(text);
  const features = {};

  vocab.forEach(word => {
    features[word] = tokens.includes(word) ? 1 : 0;
  });

  return features;
}

// -------------------------
// 3. Build training set
// -------------------------
const trainingSet = [];

intents.forEach(item => {
  item.utterances.forEach(u => {
    trainingSet.push({
      input: textToFeatures(u),
      output: { [item.intent]: 1 }
    });
  });
});

// -------------------------
// 4. Train network
// -------------------------
const net = new brain.NeuralNetwork({
  hiddenLayers: [16, 16]
});

console.log("Training NLP model...");
net.train(trainingSet, {
  iterations: 5000,
  errorThresh: 0.005,
  log: true,
  logPeriod: 500
});

// -------------------------
// 5. Save model + vocab
// -------------------------
fs.writeFileSync(modelPath, JSON.stringify(net.toJSON(), null, 2));
fs.writeFileSync(vocabPath, JSON.stringify(vocab, null, 2));
console.log("✅ Model & vocab saved.");
