<template>
  <section id="models" class="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/30">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
          Podržani AI modeli
        </h2>
        <p class="text-xl text-slate-300 max-w-2xl mx-auto">
          Pristupaj svim vodećim AI modelima preko jednog API-ja
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="card text-center group">
          <div class="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <span class="text-white font-bold text-xl">AI</span>
          </div>
          <h3 class="text-lg font-semibold text-white mb-2">OpenAI</h3>
          <p class="text-slate-400 text-sm mb-3">GPT-4, GPT-3.5 Turbo</p>
          <div class="space-y-1 text-xs text-slate-500">
            <div>✓ Chat completion</div>
            <div>✓ Text generation</div>
            <div>✓ Code generation</div>
          </div>
        </div>

        <div class="card text-center group">
          <div class="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <span class="text-white font-bold text-xl">C</span>
          </div>
          <h3 class="text-lg font-semibold text-white mb-2">Anthropic</h3>
          <p class="text-slate-400 text-sm mb-3">Claude 3 Opus, Sonnet</p>
          <div class="space-y-1 text-xs text-slate-500">
            <div>✓ Long context</div>
            <div>✓ Analysis</div>
            <div>✓ Reasoning</div>
          </div>
        </div>

        <div class="card text-center group">
          <div class="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <span class="text-white font-bold text-xl">G</span>
          </div>
          <h3 class="text-lg font-semibold text-white mb-2">Groq</h3>
          <p class="text-slate-400 text-sm mb-3">Mixtral, Llama 2</p>
          <div class="space-y-1 text-xs text-slate-500">
            <div>✓ Ultra-fast inference</div>
            <div>✓ Low latency</div>
            <div>✓ High throughput</div>
          </div>
        </div>

        <div class="card text-center group">
          <div class="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <span class="text-white font-bold text-xl">Co</span>
          </div>
          <h3 class="text-lg font-semibold text-white mb-2">Cohere</h3>
          <p class="text-slate-400 text-sm mb-3">Command, Generate</p>
          <div class="space-y-1 text-xs text-slate-500">
            <div>✓ Multi-language</div>
            <div>✓ Embeddings</div>
            <div>✓ Classification</div>
          </div>
        </div>
      </div>

      <div class="mt-16 text-center">
        <div class="inline-flex items-center px-6 py-3 bg-slate-800 border border-slate-700 rounded-lg">
          <span class="text-slate-300 mr-2">I još mnogo drugih modela</span>
          <span class="text-blue-400">→</span>
        </div>
      </div>
    </div>
  </section>
</template>