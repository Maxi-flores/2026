Write a code-change patch for run_prompts.py to: (1) make LLM provider integration pluggable via LLM_PROVIDER env var supporting "openai", "anthropic", "claude", and "generic"; (2) update LLM_ENDPOINT and headers per provider defaults but allow overrides via env; (3) robustly parse common provider response shapes (OpenAI chat/text, Anthropic completion, Claude choices/text) and return the extracted text; (4) implement configurable retries with exponential backoff + full jitter for transient failures (HTTP 429, 502, 503, 504, connection errors, timeouts) with max_retries and backoff_base env vars; (5) implement rate-limit handling that respects Retry-After header when present; (6) add timeout and retry logging, and raise a clear exception after retry exhaustion; (7) keep existing behavior for writing outputs unchanged.

Requirements:
- Use requests library only.
- Add a new function call_llm_with_retries(prompt_text, provider_config) that performs request, parsing, retry/backoff, and returns a string.
- Provider-specific request/response handling should be isolated in helper funcs (e.g., build_payload_and_headers(provider, prompt) and parse_provider_response(provider, response_json)).
- Respect MODEL_PARAMS and allow overriding model and other params via provider_config env vars (LLM_MODEL, LLM_TEMPERATURE, LLM_MAX_TOKENS).
- Use exponential backoff with jitter: sleep = min(max_backoff, backoff_base * 2**attempt) * random_uniform(0.5,1.0).
- If response includes Retry-After, use it (with jitter) instead of computed backoff.
- Log retry attempts and HTTP status codes to stdout with concise messages.
- Ensure timeouts are configurable via env LLM_TIMEOUT (default 120s).
- Provide clear inline comments where provider mappings are defined.
- Return same outputs as previously expected (string content) so the rest of the script can remain unchanged.

Output only the single patch file content for run_prompts.py with the changes applied.
