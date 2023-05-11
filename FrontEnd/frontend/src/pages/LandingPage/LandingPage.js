import React from 'react';
import './LandingPage.css';
import { NavLink } from 'react-router-dom';

const LandingPage = () => {
    // const navigate = useNavigate();
  
    // const handleLoginClick = () => {
    //   navigate('/login');
    // };
  
    return (
        <>
          <header>
            <nav>
              <div className="brand-logo">
              <img src="image-placeholder.png" alt="Expense Tracking"/>
              </div>
              <ul className="nav-links">
                <li><a href="#features">Features</a></li>
                <li><a href="#use-cases">Use Cases</a></li>
                <li><a href="#faq">FAQ</a></li>
              </ul>
              <div className="auth-buttons">
                <NavLink to="/login" className="auth-button">
                  Login
                </NavLink>
                <NavLink to="/registration" className="auth-button">
                  Register
                </NavLink>
              </div>
            </nav>
          </header>
    
          <main>
            <section id="features">
              <h2>Features</h2>
              <div className="card-container">
                <div class="card">
              <img src="image-placeholder.png" alt="Expense Tracking"/>
              <h3>Expense Tracking</h3>
              <p>Easily track your daily, weekly, and monthly expenses in one place.</p>
            </div>
            <div class="card">
              <img src="image-placeholder.png" alt="Budget Planning"/>
              <h3>Budget Planning</h3>
              <p>Set up personalized budget plans to help you achieve your financial goals.</p>
            </div>
            <div class="card">
              <img src="image-placeholder.png" alt="Data Visualization"/>
              <h3>Data Visualization</h3>
              <p>Gain insights into your spending patterns with interactive charts and graphs.</p>
            </div>
              </div>
            </section>
    
            <section id="use-cases">
              <h2>Use Cases</h2>
              <div className="card-container">
                <div class="card">
              <img src="image-placeholder.png" alt="Saving for a big purchase"/>
              <h3>Saving for a big purchase</h3>
              <p>Plan and track your savings progress towards buying a house, car, or other significant items.</p>
            </div>
            <div class="card">
              <img src="image-placeholder.png" alt="Reducing debt"/>
              <h3>Reducing debt</h3>
              <p>Create a budget plan to pay off credit card debt or student loans faster.</p>
            </div>
            <div class="card">
              <img src="image-placeholder.png" alt="Managing personal finances"/>
              <h3>Managing personal finances</h3>
              <p>Gain a clearer understanding of your income and expenses to make better financial decisions.</p>
            </div>
              </div>
            </section>
    
            <section id="faq">
              <h2>FAQ</h2>
        <ul>
            <li>
              <h3>How do I get started with the Wallet Budgeting Web App?</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </li>
            <li>
              <h3>Can I use the app on multiple devices?</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </li>
        <li>
          <h3>Is my financial data secure with the Wallet Budgeting Web App?</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </li>
        <li>
          <h3>How can I export my financial data from the app?</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </li>
        <li>
          <h3>Do you offer any premium features or subscriptions?</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </li>
      </ul>
            </section>
          </main>
    
          <footer>
            <div className="social-links">
              <a href="https://www.facebook.com" target="_blank" rel="noreferrer">Facebook</a>
              <a href="https://www.instagram.com" target="_blank" rel="noreferrer">Instagram</a>
              <a href="mailto:info@example.com">Email</a>
            </div>
          </footer>
        </>
      );
};

export default LandingPage;
