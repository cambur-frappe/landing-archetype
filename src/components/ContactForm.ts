import { LitElement, html, css } from "lit";
import { property, state } from "lit/decorators.js";
import { TWStyles } from "../styles/tw";

class ContactForm extends LitElement {
  @property() name = "";
  @property() email = "";
  @property() phone = "";
  @property() description = "";
  @state() private formSubmitted = false;

  static styles = [
    css`
      .button {
        background-color: #0077cc;
        color: white;
        font-weight: bold;
        padding: 10px 20px;
        border: none;
        cursor: pointer;
      }

      .button:disabled {
        background-color: #C0DDF3;
        cursor: not-allowed;
      }

      .button:disabled:hover {
        background-color: #C0DDF3;
      }

      .button:hover {
        transition: background-color 0.3s;
        background-color: #005fa3;
      }

      .whatsapp {
        background-color: #25d366;
      }

      .whatsapp:hover {
        transition: background-color 0.3s;
        background-color: #128c7e;
      }

      .input-valid {
        border: 2px solid green;
      }

      .input-invalid {
        border: 2px solid red;
      }
    `,
    TWStyles,
  ];

  private get isFormValid() {
    return this.name && this.isEmailValid && this.phone && this.description;
  }

  private get isEmailValid() {
    return this.email.includes("@");
  }

  render() {
    return html`
      <div
        class="mx-auto flex max-w-xl flex-col justify-center border border-black p-8"
      >
        <div id="form-header">
          <p class="text-xl">¡Pide tu presupuesto!</p>
          <p class="mt-2">
            Estamos aquí para ayudarte. Completa el siguiente formulario con tus
            datos y nos pondremos en contacto contigo lo antes posible para
            ofrecerte un presupuesto personalizado.
          </p>
        </div>
        <div class="flex flex-col">
          <label for="name" class="mt-6 text-sm">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            class="mt-1 border border-gray-300 p-2"
            @input=${this._handleNameChange}
            required
          />
        </div>

        <div class="flex flex-col">
          <label for="email" class="mt-6 text-sm">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            class="mt-1 border ${this.formSubmitted && !this.isEmailValid ? 'input-invalid' : 'border-gray-300'} p-2"
            @input=${this._handleEmailChange}
            required
          />
        </div>

        <div class="flex flex-col">
          <label for="phone" class="mt-6 text-sm">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            class="mt-1 border border-gray-300 p-2"
            @input=${this._handlePhoneChange}
            required
          />
        </div>

        <div class="flex flex-col">
          <label for="description" class="mt-6 text-sm"
            >Description of Service:</label
          >
          <textarea
            id="description"
            name="description"
            rows="4"
            class="mt-1 border border-gray-300 p-2"
            @input=${this._handleDescriptionChange}
            required
            style="resize: none;"
          ></textarea>
        </div>
        <button id="submit" @click=${this._handleSubmit} class="button mt-6" ?disabled=${!this.isFormValid}
        >
          Solicitar presupuesto
        </button>
      </div>
    `;
  }

  _handleNameChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.name = input.value;
  }

  _handleEmailChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.email = input.value;
  }

  _handlePhoneChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.phone = input.value;
  }

  _handleDescriptionChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.description = input.value;
  }

  _handleSubmit(event: Event) {
    event.preventDefault();
    this.formSubmitted = true;
    if (this.isFormValid) {
      // send form data to email
      console.log("Form submitted!");
    } else {
      
    }
  }
}

customElements.define("contact-form", ContactForm);
