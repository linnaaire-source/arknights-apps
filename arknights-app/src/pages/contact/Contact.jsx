import { useState } from 'react'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import SilkBackground from '../../components/silk-background/SilkBackground'
import './Contact.css'

// Contact page – includes HQ info, Leaflet map placeholder, and contact form
function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [hasError, setHasError] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = Object.values(formData).every(v => v.trim() !== '')
    if (!isValid) {
      setHasError(true)
      return
    }
    setHasError(false)
    setIsSubmitted(true)
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="page-wrapper">
      <Header />

      <main className="page-content">

        {/* Hero */}
        <div className="contact-page__hero">
          <SilkBackground speed={2} scale={0.7} color="#66bb6a" noiseIntensity={0.9} />
          <div className="contact-page__hero-content container">
            <p className="contact-page__eyebrow">Rhodes Island HQ</p>
            <h1 className="contact-page__title">CONTACT US</h1>
            <p className="contact-page__subtitle">Reach out to our operators. We respond within 48 hours.</p>
          </div>
        </div>

        {/* Info + form */}
        <section className="contact-page__content container">
          <div className="contact-page__grid">

            {/* Info column */}
            <div className="contact-page__info">
              <h2 className="section-title">HQ LOCATION</h2>

              {/* Leaflet map iframe */}
              <div className="contact-page__map-wrap">
                <iframe
                  title="Rhodes Island HQ Location"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=139.6903,35.6851,139.7103,35.7051&layer=mapnik&marker=35.6951,139.7003"
                  className="contact-page__map"
                  loading="lazy"
                />
                <div className="contact-page__map-overlay">
                  <span className="contact-page__map-label">Rhodes Island — Tokyo Office</span>
                </div>
              </div>

              {/* Address card */}
              <div className="contact-page__address">
                <div className="contact-page__address-item">
                  <i className="fa-solid fa-location-dot contact-page__address-icon" />
                  <div>
                    <p className="contact-page__address-label">Address</p>
                    <p className="contact-page__address-val">1-2-1 Kanda Ogawamachi, Chiyoda-ku, Tokyo — Rhodes Island Landship</p>
                  </div>
                </div>
                <div className="contact-page__address-item">
                  <i className="fa-solid fa-envelope contact-page__address-icon" />
                  <div>
                    <p className="contact-page__address-label">Email</p>
                    <p className="contact-page__address-val">support@arknights.global</p>
                  </div>
                </div>
                <div className="contact-page__address-item">
                  <i className="fa-solid fa-clock contact-page__address-icon" />
                  <div>
                    <p className="contact-page__address-label">Support Hours</p>
                    <p className="contact-page__address-val">Mon–Fri · 09:00–18:00 JST</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form column */}
            <div className="contact-page__form-wrap">
              <h2 className="section-title">SEND A MESSAGE</h2>

              {isSubmitted ? (
                <div className="contact-page__success">
                  <i className="fa-solid fa-circle-check contact-page__success-icon" />
                  <h3>Message Received</h3>
                  <p>Your message has been transmitted to Rhodes Island HQ. We will respond within 48 hours.</p>
                  <button className="btn-secondary" onClick={() => setIsSubmitted(false)}>
                    Send Another
                  </button>
                </div>
              ) : (
                <form className="contact-page__form" onSubmit={handleSubmit} noValidate>
                  {hasError && (
                    <p className="contact-page__error">
                      <i className="fa-solid fa-triangle-exclamation" /> Please fill in all fields.
                    </p>
                  )}

                  <div className="contact-page__fields-row">
                    <div className="contact-page__field">
                      <label className="contact-page__label" htmlFor="name">Name</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        className="contact-page__input"
                        placeholder="Doctor..."
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="contact-page__field">
                      <label className="contact-page__label" htmlFor="email">Email</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className="contact-page__input"
                        placeholder="doctor@rhodes.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="contact-page__field">
                    <label className="contact-page__label" htmlFor="subject">Subject</label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      className="contact-page__input"
                      placeholder="Originium Crisis Report..."
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="contact-page__field">
                    <label className="contact-page__label" htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      className="contact-page__textarea"
                      placeholder="Describe your situation, Doctor..."
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      required
                    />
                  </div>

                  <button type="submit" className="btn-primary contact-page__submit">
                    <i className="fa-solid fa-paper-plane" /> Transmit Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}

export default Contact
