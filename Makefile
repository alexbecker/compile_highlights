.PHONY: local/plugins/compile_highlights
local/plugins/compile_highlights:
	grep -rli "<code" static | xargs node local/plugins/compile_highlights/compile_highlights.js --css /css/highlights.css
