import './spinner-style.css';

class Spinner {
    private on: boolean;
    private stack: number;
    private spinner: HTMLDivElement;

    constructor() {
        this.on = true;
        this.stack = 0;
        this.spinner = document.getElementById('spinner') as HTMLDivElement;
        if (!this.spinner) {
            throw Error('unable to locate spinner container');
        }
    }

    public Enable(): void {
        this.stack++;
        this.show();
    }

    public Disable(): void {
        this.stack--;
        if (this.stack < 0) {
            console.error('negative queue');
        } else if (this.stack === 0) {
            this.hide();
        }
    }

    private show(): void {
        if (!this.on) {
            this.on = true;
            this.spinner.style.display = 'block';
        }
    }

    private hide(): void {
        if (this.on) {
            this.on = false;
            this.spinner.style.display = 'none';
        }
    }
}

const spinner = new Spinner();
export default spinner;
