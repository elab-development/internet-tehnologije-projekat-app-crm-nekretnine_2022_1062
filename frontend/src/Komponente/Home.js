 
import React, { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';
import anime from 'animejs';
import './Home.css';
import { FaHome, FaBuilding, FaDollarSign, FaHandshake, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

const Home = () => {
  useEffect(() => {
    ScrollReveal().reveal('.is-revealing', {
      distance: '20px',
      duration: 1000,
      easing: 'ease-out',
      origin: 'bottom',
      interval: 200,
    });

    anime({
      targets: '.hero-figure-box',
      translateX: [
        { value: 10, duration: 1000 },
        { value: -10, duration: 1000 },
      ],
      loop: true,
      easing: 'easeInOutQuad',
    });
  }, []);

  return (
    <div className="body-wrap">
      <header className="site-header">
        <div className="container">
          <div className="site-header-inner">
            <div className="brand header-brand">
              <h1 className="m-0">
                
                    CRM NEKRETNINE
                 
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container">
            <div className="hero-inner">
              <div className="hero-copy">
                <h1 className="hero-title mt-0">Find Your Dream Home</h1>
                <p className="hero-paragraph">Explore the best properties in your city with our comprehensive real estate platform.</p>
                <div className="hero-cta">
                  <a className="button button-primary" href="#">View Listings</a>
                  <a className="button" href="#">Contact Us</a>
                </div>
              </div>
              <div className="hero-figure anime-element">
                <svg className="placeholder" width="528" height="396" viewBox="0 0 528 396">
                  <rect width="528" height="396" style={{ fill: 'transparent' }} />
                </svg>
                <div className="hero-figure-box hero-figure-box-01" data-rotation="45deg"></div>
                <div className="hero-figure-box hero-figure-box-02" data-rotation="-45deg"></div>
                <div className="hero-figure-box hero-figure-box-03" data-rotation="0deg"></div>
                <div className="hero-figure-box hero-figure-box-04" data-rotation="-135deg"></div>
                <div className="hero-figure-box hero-figure-box-05"></div>
                <div className="hero-figure-box hero-figure-box-06"></div>
                <div className="hero-figure-box hero-figure-box-07"></div>
                <div className="hero-figure-box hero-figure-box-08" data-rotation="-22deg"></div>
                <div className="hero-figure-box hero-figure-box-09" data-rotation="-52deg"></div>
                <div className="hero-figure-box hero-figure-box-10" data-rotation="-50deg"></div>
              </div>
            </div>
          </div>
        </section>

        <section className="features section">
          <div className="container">
            <div className="features-inner section-inner has-bottom-divider">
              <div className="features-wrap">
                <div className="feature text-center is-revealing">
                  <div className="feature-inner">
                    <div className="feature-icon">
                      <FaHome size={48} />
                    </div>
                    <h4 className="feature-title mt-24">Beautiful Homes</h4>
                    <p className="text-sm mb-0">Discover a variety of beautiful homes to suit your taste and budget.</p>
                  </div>
                </div>
                <div className="feature text-center is-revealing">
                  <div className="feature-inner">
                    <div className="feature-icon">
                      <FaBuilding size={48} />
                    </div>
                    <h4 className="feature-title mt-24">Commercial Properties</h4>
                    <p className="text-sm mb-0">Find the perfect commercial properties for your business needs.</p>
                  </div>
                </div>
                <div className="feature text-center is-revealing">
                  <div className="feature-inner">
                    <div className="feature-icon">
                      <FaDollarSign size={48} />
                    </div>
                    <h4 className="feature-title mt-24">Affordable Prices</h4>
                    <p className="text-sm mb-0">We offer competitive pricing on all our listings to fit your budget.</p>
                  </div>
                </div>
                <div className="feature text-center is-revealing">
                  <div className="feature-inner">
                    <div className="feature-icon">
                      <FaHandshake size={48} />
                    </div>
                    <h4 className="feature-title mt-24">Trusted Agents</h4>
                    <p className="text-sm mb-0">Our experienced agents are here to help you every step of the way.</p>
                  </div>
                </div>
                <div className="feature text-center is-revealing">
                  <div className="feature-inner">
                    <div className="feature-icon">
                      <FaMapMarkerAlt size={48} />
                    </div>
                    <h4 className="feature-title mt-24">Prime Locations</h4>
                    <p className="text-sm mb-0">Explore properties in the best locations across the city.</p>
                  </div>
                </div>
                <div className="feature text-center is-revealing">
                  <div className="feature-inner">
                    <div className="feature-icon">
                      <FaPhoneAlt size={48} />
                    </div>
                    <h4 className="feature-title mt-24">24/7 Support</h4>
                    <p className="text-sm mb-0">We are available 24/7 to assist you with any queries or concerns.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pricing section">
          <div className="container-sm">
            <div className="pricing-inner section-inner">
              <div className="pricing-header text-center">
                <h2 className="section-title mt-0">Affordable Plans</h2>
                <p className="section-paragraph mb-0">Choose from a range of affordable plans tailored to your needs.</p>
              </div>
              <div className="pricing-tables-wrap">
                <div className="pricing-table">
                  <div className="pricing-table-inner is-revealing">
                    <div className="pricing-table-main">
                      <div className="pricing-table-header pb-24">
                        <div className="pricing-table-price">
                          <span className="pricing-table-price-currency h2">$</span>
                          <span className="pricing-table-price-amount h1">49</span>
                          <span className="text-xs">/month</span>
                        </div>
                      </div>
                      <div className="pricing-table-features-title text-xs pt-24 pb-24">What you will get</div>
                      <ul className="pricing-table-features list-reset text-xs">
                        {Array(4).fill().map((_, index) => (
                          <li key={index}><span>Lorem ipsum dolor sit nisi</span></li>
                        ))}
                      </ul>
                    </div>
                    <div className="pricing-table-cta mb-8">
                      <a className="button button-primary button-shadow button-block" href="#">Get Started</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      
      </main>

 
    </div>
  );
}

export default Home;
