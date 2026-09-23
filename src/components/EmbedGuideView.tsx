import React, { useState } from 'react';
import { Copy, Check, Code2, Terminal, Globe, FileCode } from 'lucide-react';

export const EmbedGuideView: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const htmlFormSnippet = `<!-- Embeddable Lead Capture Form for any Website -->
<form action="${window.location.origin}/api/leads" method="POST" class="crm-lead-form">
  <input type="text" name="name" placeholder="Full Name" required />
  <input type="email" name="email" placeholder="Email Address" required />
  <input type="tel" name="phone" placeholder="Phone (Optional)" />
  <input type="text" name="company" placeholder="Company Name" />
  
  <input type="hidden" name="source" value="Agency Landing Page" />
  
  <select name="serviceInterested">
    <option value="Web Development">Web Development</option>
    <option value="UI/UX Design">UI/UX Design</option>
    <option value="Custom CRM">Custom CRM</option>
  </select>
  
  <textarea name="message" placeholder="Describe your project..." required></textarea>
  <button type="submit">Submit Inquiry</button>
</form>`;

  const jsFetchSnippet = `// Modern JavaScript Async Submission
async function submitClientLead(formData) {
  try {
    const response = await fetch('${window.location.origin}/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        source: 'Client Webflow Form',
        serviceInterested: formData.service,
        budget: formData.budget,
        message: formData.message,
        priority: 'high',
      }),
    });

    const result = await response.json();
    if (result.success) {
      console.log('Lead stored in ApexCRM:', result.data.id);
      alert('Thank you! Our team has received your inquiry.');
    }
  } catch (error) {
    console.error('Lead submission failed:', error);
  }
}`;

  const curlSnippet = `curl -X POST "${window.location.origin}/api/leads" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Sarah Miller",
    "email": "sarah@luminex.io",
    "company": "Luminex Design",
    "source": "Webhook / Zapier",
    "serviceInterested": "Full-Stack Web App Development",
    "budget": "$15,000",
    "message": "We need an integrated lead intake and analytics engine."
  }'`;

  return (
    <div className="flex-1 overflow-y-auto bg-neutral-50 p-6 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h2 className="text-lg font-bold text-neutral-900 tracking-tight">
            Embed Code & API Webhook Integration
          </h2>
          <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
            Connect any website, landing page builder (Webflow, Framer, WordPress), or automation pipeline (Zapier, Make) directly into ApexCRM.
          </p>
        </div>

        {/* Integration Card 1: HTML Form Embed */}
        <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileCode className="w-4 h-4 text-neutral-900" />
              <h3 className="text-xs font-semibold text-neutral-900">
                1. Standard HTML Form (Drop into any Webflow / WordPress / Static site)
              </h3>
            </div>
            <button
              onClick={() => copyToClipboard(htmlFormSnippet, 'html')}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded transition-colors"
            >
              {copiedKey === 'html' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'html' ? 'Copied' : 'Copy Snippet'}</span>
            </button>
          </div>
          <pre className="p-4 bg-neutral-900 text-neutral-200 rounded-lg text-xs font-mono overflow-x-auto leading-relaxed">
            {htmlFormSnippet}
          </pre>
        </div>

        {/* Integration Card 2: JavaScript Fetch */}
        <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-neutral-900" />
              <h3 className="text-xs font-semibold text-neutral-900">
                2. JavaScript / React / Next.js Fetch API
              </h3>
            </div>
            <button
              onClick={() => copyToClipboard(jsFetchSnippet, 'js')}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded transition-colors"
            >
              {copiedKey === 'js' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'js' ? 'Copied' : 'Copy Snippet'}</span>
            </button>
          </div>
          <pre className="p-4 bg-neutral-900 text-neutral-200 rounded-lg text-xs font-mono overflow-x-auto leading-relaxed">
            {jsFetchSnippet}
          </pre>
        </div>

        {/* Integration Card 3: cURL / Terminal */}
        <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-neutral-900" />
              <h3 className="text-xs font-semibold text-neutral-900">
                3. Direct cURL Command (Terminal & Webhooks)
              </h3>
            </div>
            <button
              onClick={() => copyToClipboard(curlSnippet, 'curl')}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded transition-colors"
            >
              {copiedKey === 'curl' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'curl' ? 'Copied' : 'Copy Command'}</span>
            </button>
          </div>
          <pre className="p-4 bg-neutral-900 text-neutral-200 rounded-lg text-xs font-mono overflow-x-auto leading-relaxed">
            {curlSnippet}
          </pre>
        </div>
      </div>
    </div>
  );
};
