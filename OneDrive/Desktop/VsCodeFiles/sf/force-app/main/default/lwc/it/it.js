import { LightningElement } from 'lwc';
import AccessProfessionals from '@salesforce/resourceUrl/AccessProfessionals';
import Analyze from '@salesforce/resourceUrl/Analyze';
import ReduceCost from '@salesforce/resourceUrl/ReduceCost';
import ReduceRisk from '@salesforce/resourceUrl/ReduceRisk';


export default class It extends LightningElement {
    accessProfessionals = AccessProfessionals;
    analyze = Analyze;
    reduceCost = ReduceCost;
    reduceRisk = ReduceRisk;
    observer;

    connectedCallback() {
        // Create the IntersectionObserver
        this.observer = new IntersectionObserver(this.handleIntersect, {
            root: null,
            threshold: 0.1 // Trigger when 10% of the component is visible
        });
    }

    renderedCallback() {
        // Observe the component container for visibility changes
        const target = this.template.querySelector('.card-container');
        if (target) {
            this.observer.observe(target);
        }
    }

    handleIntersect = (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // When the element comes into view, add the 'slide-in' class for animation
                entry.target.classList.add('slide-in');
                this.observer.unobserve(entry.target); // Stop observing after the animation triggers
            }
        });
    };

    // Mouse over event handler
    handleMouseOver(event) {
        event.currentTarget.style.backgroundColor = "#e3f2fd"; // Change background color on hover
    }

    // Mouse out event handler
    handleMouseOut(event) {
        event.currentTarget.style.backgroundColor = ""; // Reset background color when mouse leaves
    }
}