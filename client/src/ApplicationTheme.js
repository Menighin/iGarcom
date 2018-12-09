
class ApplicationTheme {
	get primaryColor() { return this._primaryColor; }
	set primaryColor(color) { this._primaryColor = color; }

	get primaryHighlightColor() { return this._primaryHighlightColor; }
	set primaryHighlightColor(color) { this._primaryHighlightColor = color; }

	get secondaryColor() { return this._secondaryColor; }
	set secondaryColor(color) { this._secondaryColor = color; }

	get secondaryHighlightColor() { return this._secondaryHighlightColor; }
	set secondaryHighlightColor(color) { this._secondaryHighlightColor = color; }

	get backgroundColor() { return this._backgroundColor; }
	set backgroundColor(color) { this._backgroundColor = color; }

	get backgroundHighlightColor() { return this._backgroundHighlightColor; }
	set backgroundHighlightColor(color) { this._backgroundHighlightColor = color; }

	get labelPrimary() { return this._labelPrimary; }
	set labelPrimary(color) { this._labelPrimary = color; }

	get labelSecondary() { return this._labelSecondary; }
	set labelSecondary(color) { this._labelSecondary = color; }

	build(metadata) {
		const { theme } = metadata;
		this.primaryColor = theme.primary;
		this.primaryHighlightColor = theme.primaryHighlight;

		this.secondaryColor = theme.secondary;
		this.secondaryHighlightColor = theme.secondaryHighlight;

		this.backgroundColor = theme.background;
		this.backgroundHighlightColor = theme.backgroundHighlight;

		this.labelPrimary = theme.labelPrimary;
		this.labelSecondary = theme.labelSecondary;
	}
}

export default new ApplicationTheme();
