import {unified, Processor} from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import remarkToc from 'remark-toc';
import remarkGfm from 'remark-gfm';
import remarkEmoji from 'remark-emoji';

type WritrOptions = {
	openai?: string; // Openai api key (default: undefined)
	emoji?: boolean; // Emoji support (default: true)
	toc?: boolean; // Table of contents generation (default: true)
	slug?: boolean; // Slug generation (default: true)
	highlight?: boolean; // Code highlighting (default: true)
	gfm?: boolean; // Github flavor markdown (default: true)
};

type RenderOptions = {
	emoji?: boolean; // Emoji support (default: true)
	toc?: boolean; // Table of contents generation (default: true)
	slug?: boolean; // Slug generation (default: true)
	highlight?: boolean; // Code highlighting (default: true)
	gfm?: boolean; // Github flavor markdown (default: true)
};

class Writr {
	public engine = unified()
		.use(remarkParse)
		.use(remarkGfm) // Use GitHub Flavored Markdown
		.use(remarkToc, {heading: 'toc|table of contents'})
		.use(remarkEmoji)
		.use(remarkRehype) // Convert markdown to HTML
		.use(rehypeSlug) // Add slugs to headings in HTML
		.use(rehypeHighlight) // Apply syntax highlighting
		.use(rehypeStringify); // Stringify HTML

	private readonly _options: WritrOptions = {
		openai: undefined,
		emoji: true,
		toc: true,
		slug: true,
		highlight: true,
		gfm: true,
	};

	constructor(options?: WritrOptions) {
		if (options) {
			this._options = {...this._options, ...options};
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			this.engine = this.createProcessor(this._options);
		}
	}

	public get options(): WritrOptions {
		return this._options;
	}

	async render(markdown: string, options?: RenderOptions): Promise<string> {
		try {
			let {engine} = this;
			if (options) {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				engine = this.createProcessor(options);
			}

			const file = await engine.process(markdown);
			return String(file);
		} catch (error) {
			throw new Error(`Failed to render markdown: ${(error as Error).message}`);
		}
	}

	private createProcessor(options: RenderOptions | WritrOptions): any {
		const processor = unified().use(remarkParse);

		if (options.gfm ?? this._options.gfm) {
			processor.use(remarkGfm);
		}

		if (options.toc ?? this._options.toc) {
			processor.use(remarkToc, {heading: 'toc|table of contents'});
		}

		if (options.emoji ?? this._options.emoji) {
			processor.use(remarkEmoji);
		}

		processor.use(remarkRehype);

		if (options.slug ?? this._options.slug) {
			processor.use(rehypeSlug);
		}

		if (options.highlight ?? this._options.highlight) {
			processor.use(rehypeHighlight);
		}

		processor.use(rehypeStringify);

		return processor;
	}
}

export {Writr, type WritrOptions, type RenderOptions};

