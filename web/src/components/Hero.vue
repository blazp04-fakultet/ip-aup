<template>
  <section class="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="text-center">
        <!-- Badge -->
        <div
          class="inline-flex items-center px-4 py-2 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-300 text-sm font-medium mb-6 animate-pulse-slow">
          <span class="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
          Sve AI modele. Jedan API. Nula komplikacija.
        </div>

        <!-- Main Heading -->
        <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Jedini <span class="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">AI
            API</span><br>
          koji ti treba
        </h1>

        <!-- Subtitle -->
        <p class="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          Pristupaj OpenAI, Anthropic, Groq, Cohere i drugim AI modelima preko jednog jednostavnog API-ja.
          Bez 10 accounta, bez komplikacija.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button class="btn-primary text-lg px-10 py-4">
            Počni besplatno
          </button>
          <button class="btn-secondary text-lg px-10 py-4">
            Pogledaj dokumentaciju
          </button>
        </div>

        <!-- API Demo -->
        <div class="max-w-4xl mx-auto">
          <div class="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 text-left animate-float">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center space-x-2">
                <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div class="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span class="text-slate-400 text-sm">LLMBridge API</span>
            </div>
            <pre class="text-sm text-slate-300 overflow-x-auto"><code class="language-javascript">// Jedan API za sve AI modele
const response = await fetch('https://api.llmbridge.com/api/v1/chat', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer your-api-key',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'gpt-4', // ili 'claude-3', 'llama2', 'mixtral'...
    messages: [
      { role: 'user', content: 'Objasni mi kvantnu fiziku' }
    ]
  })
});

const data = await response.json();
console.log(data.choices[0].message.content);</code></pre>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>