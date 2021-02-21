import './pagenav.css';

type PageNavBarEvent = 'pageChange' | 'boundaryChange';

export class Bar {
    private pages: number;
    private currentPage: number;
    private root: HTMLDivElement;
    private handlers: Map<PageNavBarEvent, ((newPage: number, oldPage: number) => void)[]>;

    constructor(pages: number, element?: HTMLDivElement | string) {
        if (!Number.isInteger(pages) || pages < 1) {
            throw Error('wrong number of pages: ' + pages);
        }
        if (element) {
            if (typeof element === 'string') {
                const parent = document.getElementById(element);
                if (!parent) {
                    throw Error("can't find an element with the id: " + element);
                }
                this.root = parent.appendChild(document.createElement('div'));
            } else if (element instanceof HTMLDivElement) {
                this.root = element;
            }
        } else {
            this.root = document.createElement('div');
        }
        this.root.classList.add('pagenav-bar');
        this.pages = pages;
        this.currentPage = 1;
        this.handlers = new Map<PageNavBarEvent, ((newPage: number, oldPage: number) => void)[]>();
        this.render();
    }

    public attachEvent(
        eventName: PageNavBarEvent,
        handler: (newPage: number, oldPage: number) => void
    ): void {
        if (this.handlers.has(eventName)) {
            let handlers = this.handlers.get(eventName);
            handlers.push(handler);
        } else {
            this.handlers.set(eventName, [handler]);
        }
    }

    public render(): void {
        this.root.innerHTML = '';
        const prevButton = this.renderButton('<');
        prevButton.addEventListener('click', (): void => {
            this.prev();
        });
        this.renderDigitButtons();
        const nextButton = this.renderButton('>');
        nextButton.addEventListener('click', (): void => {
            this.next();
        });
        if (this.currentPage === 1) {
            prevButton.classList.add('disabled');
        }
        if (this.currentPage === this.pages) {
            nextButton.classList.add('disabled');
        }
    }

    private renderDigitButtons(): void {
        if (this.currentPage === 1) {
            this.renderDigitButton(1).classList.add('active');
        } else {
            this.renderDigitButton(1);
        }
        if (this.currentPage > 5) {
            this.renderDotsDutton();
            this.renderDigitButton(this.currentPage - 2);
            this.renderDigitButton(this.currentPage - 1);
        } else {
            for (let i = 2; i < this.currentPage; i++) {
                this.renderDigitButton(i);
            }
        }
        if (this.currentPage !== 1 && this.currentPage !== this.pages) {
            this.renderDigitButton(this.currentPage).classList.add('active');
        }
        if (this.pages - this.currentPage > 4) {
            this.renderDigitButton(this.currentPage + 1);
            this.renderDigitButton(this.currentPage + 2);
            this.renderDotsDutton();
        } else {
            for (let i = this.currentPage + 1; i < this.pages; i++) {
                this.renderDigitButton(i);
            }
        }
        if (this.pages > 1) {
            if (this.currentPage === this.pages) {
                this.renderDigitButton(this.pages).classList.add('active');
            } else {
                this.renderDigitButton(this.pages);
            }
        }
    }

    private renderDotsDutton(): HTMLDivElement {
        const btn = this.renderButton('...');
        btn.classList.add('disabled');
        return btn;
    }

    private renderDigitButton(n: number): HTMLDivElement {
        const btn = document.createElement('div');
        btn.innerText = n.toString();
        this.root.appendChild(btn);
        btn.addEventListener('click', (): void => {
            this.changePage(n);
        });
        return btn;
    }

    private renderButton(text: string): HTMLDivElement {
        const btn = document.createElement('div');
        btn.innerText = text;
        this.root.appendChild(btn);
        return btn;
    }

    public getRoot(): HTMLDivElement {
        return this.root;
    }

    public changePage(want: number): number {
        const pageAfterChange = this.computePage(want);
        if (pageAfterChange !== this.currentPage) {
            const oldPage = this.currentPage;
            this.currentPage = pageAfterChange;
            let handlers = this.handlers.get('pageChange');
            for (let i = 0; i < handlers.length; i++) {
                handlers[i](this.currentPage, oldPage);
            }
            this.render();
        }
        return this.currentPage;
    }

    private computePage(want: number): number {
        if (!want || !Number.isInteger(want)) {
            return 1;
        }
        if (want < 1) {
            return 1;
        } else if (want > this.pages) {
            return this.pages;
        }
        return want;
    }

    public next(): number {
        return this.changePage(this.currentPage + 1);
    }

    public prev(): number {
        return this.changePage(this.currentPage - 1);
    }
}
