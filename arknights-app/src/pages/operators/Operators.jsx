import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import OperatorsGrid from '../../components/operators-grid/OperatorsGrid'
import SilkBackground from '../../components/silk-background/SilkBackground'
import './Operators.css'

// Operators page – full roster with Firebase-backed filtering
function Operators() {
  return (
    <div className="page-wrapper">
      <Header />

      <main className="page-content">

        {/* Page hero */}
        <div className="operators-page__hero">
          <SilkBackground speed={2} scale={0.8} color="#4fc3f7" noiseIntensity={0.8} />
          <div className="operators-page__hero-content container">
            <p className="operators-page__eyebrow">Rhodes Island Database</p>
            <h1 className="operators-page__title">OPERATOR ROSTER</h1>
            <p className="operators-page__subtitle">
              Browse and filter all available Operators. Data sourced from Firebase.
            </p>
          </div>
        </div>

        {/* Grid */}
        <section className="operators-page__content container">
          <OperatorsGrid />
        </section>

      </main>

      <Footer />
    </div>
  )
}

export default Operators
