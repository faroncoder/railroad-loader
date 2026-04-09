/**
 * Railroad Loader v1.0.0
 * 
 * Animated DNA helix loader with terminal-style progress messages.
 * Works standalone or with HTMX.
 * 
 * @license MIT
 * @author Faron Coder
 * @see https://github.com/faroncoder/railroad-loader
 */

(function(window) {
  'use strict';

  const MIN_DISPLAY = 500; // Min duration loader stays visible

  const DEFAULT_MESSAGES = [
    'Loading content...',
    'Processing request...',
    'Fetching data...',
    'Building response...',
    'Rendering view...',
    'Almost done...',
  ];

  const COLORS = ['#3fb950', '#58a6ff', '#d29922', '#f0883e', '#8b5cf6'];

  let _interval = null;
  let _step = 0;
  let _showTime = 0;
  let _loading = false;
  let _messages = DEFAULT_MESSAGES;
  let _loaderElement = null;

  /**
   * Create the loader DOM element
   */
  function createLoader() {
    const loader = document.createElement('div');
    loader.id = 'railroad-loader';
    loader.style.cssText = 'display:none; position:fixed; top:50%; left:50%; transform:translate(-50%, -50%); z-index:9999; flex-direction:column; align-items:center; gap:1.5rem;';
    
    loader.innerHTML = [
      '<div style="display:flex; justify-content:center;">',
      '  <svg width="60" height="60" viewBox="0 0 60 60">',
      '    <g transform="translate(30,30)">',
      '      <circle r="4" cx="-12" cy="0" fill="#58a6ff"><animate attributeName="cy" values="-12;12;-12" dur="0.8s" repeatCount="indefinite"/></circle>',
      '      <circle r="4" cx="0" cy="0" fill="#3fb950"><animate attributeName="cy" values="12;-12;12" dur="0.8s" repeatCount="indefinite"/></circle>',
      '      <circle r="4" cx="12" cy="0" fill="#d29922"><animate attributeName="cy" values="-12;12;-12" dur="0.8s" begin="0.15s" repeatCount="indefinite"/></circle>',
      '      <circle r="3" cx="-6" cy="0" fill="#f0883e" opacity="0.6"><animate attributeName="cy" values="0;-8;8;0" dur="0.8s" begin="0.1s" repeatCount="indefinite"/></circle>',
      '      <circle r="3" cx="6" cy="0" fill="#8b5cf6" opacity="0.6"><animate attributeName="cy" values="0;8;-8;0" dur="0.8s" begin="0.1s" repeatCount="indefinite"/></circle>',
      '    </g>',
      '  </svg>',
      '</div>',
      '<div id="railroad-loader-message" style="font-size:0.875rem; color:#9ca3af; text-align:center; min-width:200px;"></div>',
    ].join('');
    
    document.body.appendChild(loader);
    return loader;
  }

  /**
   * Update the message displayed
   */
  function updateMessage(text) {
    if (!_loaderElement) return;
    const msgEl = _loaderElement.querySelector('#railroad-loader-message');
    if (msgEl) msgEl.textContent = text;
  }

  /**
   * Start cycling through messages
   */
  function startMessages() {
    _step = 0;
    updateMessage(_messages[0]);

    if (_interval) clearInterval(_interval);
    _interval = setInterval(function() {
      _step++;
      if (_step >= _messages.length) _step = 0;
      updateMessage(_messages[_step]);
    }, 600);
  }

  /**
   * Show the loader
   * @param {Array<string>} messages - Optional array of messages to cycle through
   */
  function show(messages) {
    if (_loading) return;

    if (messages && Array.isArray(messages)) {
      _messages = messages;
    } else {
      _messages = DEFAULT_MESSAGES;
    }

    if (!_loaderElement) {
      _loaderElement = createLoader();
    }

    _loading = true;
    _showTime = Date.now();
    _loaderElement.style.display = 'flex';
    
    startMessages();
  }

  /**
   * Hide the loader (respects MIN_DISPLAY duration)
   */
  function hide() {
    if (!_loading) return;

    const elapsed = Date.now() - _showTime;
    const remaining = Math.max(0, MIN_DISPLAY - elapsed);

    setTimeout(function() {
      _loading = false;
      if (_interval) {
        clearInterval(_interval);
        _interval = null;
      }
      if (_loaderElement) {
        _loaderElement.style.display = 'none';
      }
    }, remaining);
  }

  /**
   * Check if loader is currently showing
   */
  function isLoading() {
    return _loading;
  }

  // ── HTMX Integration (optional) ──────────────────────────────────
  if (typeof htmx !== 'undefined' || document.body.getAttribute('hx-boost')) {
    document.body.addEventListener('htmx:beforeRequest', function() {
      show();
    });

    document.body.addEventListener('htmx:afterRequest', function() {
      hide();
    });

    document.body.addEventListener('htmx:sendError', function() {
      hide();
    });
  }

  // ── Export API ────────────────────────────────────────────────────
  const RailroadLoader = {
    show: show,
    hide: hide,
    isLoading: isLoading,
    setMessages: function(messages) { _messages = messages; },
    getMessages: function() { return _messages; }
  };

  // Global export
  window.RailroadLoader = RailroadLoader;

  // Module export
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = RailroadLoader;
  }

  console.log('[Railroad Loader] Initialized');

})(typeof window !== 'undefined' ? window : this);
