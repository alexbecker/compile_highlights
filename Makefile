.PHONY: plugins/compile_highlights
plugins/compile_highlights:
	grep -rli "<code" static | xargs node plugins/compile_highlights/compile_highlights.js --css css/highlights.css
