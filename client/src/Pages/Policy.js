import React from "react";
import Layout from "./../Components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="row contactus">
        <div className="col-md-8">
          <img
            src="/images/pnp.jpeg"
            alt="Privacy Policy"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h2>Privacy Policy</h2>
          <p>Your privacy is important to us. This policy outlines how we handle your personal information.</p>

          <h3>Information We Collect</h3>
          <p>We collect information such as your name, email, address, and payment details when you make a purchase.</p>

          <h3>How We Use Information</h3>
          <p>We use your information to process orders, provide customer support, and send promotional emails.</p>

          <h3>Sharing Information</h3>
          <p>We do not share your personal information with third parties except to fulfill your orders and comply with legal requirements.</p>

          <h3>Security</h3>
          <p>We take reasonable steps to protect your information but cannot guarantee its absolute security.</p>

          
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
