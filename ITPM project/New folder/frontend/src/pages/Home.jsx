import React from 'react';

const Home = () => {
  return (
    <section className="home grid grid-cols-[45%_50%] place-items-center gap-12 bg-gradient-to-r from-[#434570] to-[#232439] overflow-hidden px-20 py-32">
      <div className="description text-white px-12">
        <h1 className="title font-[Tilt Neon], sans-serif text-5xl sm:text-6xl lg:text-7xl leading-tight mb-8">
          <span className="gradient-text bg-gradient-to-r from-[#76A73F] via-[#338F76] to-[#7398F2] text-transparent bg-clip-text">
            FinTech Finance Application
          </span> 
          with AI
        </h1>
        <p className="paragraph font-[Nunito], sans-serif text-lg sm:text-xl leading-relaxed mb-8">
          Take control of your finances with our intelligent budget prediction tool. Powered by AI, our application helps you plan and manage your budget by analyzing spending patterns and forecasting future expenses. Stay on track with personalized insights for smarter financial decisions.
        </p>
        <form id="form" autoComplete="off" className="relative flex items-center">
          <button type="submit" className="btn bg-gradient-to-r from-[#76A73F] via-[#338F76] to-[#7398F2] text-white text-lg font-medium px-6 py-3 rounded-lg shadow-md hover:bg-gradient-to-l transition-all">
            <span><a href='/Login'>Login</a></span>
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </button>
        </form>
      </div>

      <div className="users-color-container grid grid-cols-4 gap-4">
        <span className="item" style={{ "--i": 1 }}></span>
        <img className="item" src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/274f29ce-0d3f-4ac2-a2aa-f9b7bd188b2a" alt="" style={{ "--i": 2 }} />
        <span className="item" style={{ "--i": 3 }}></span>
        <img className="item" src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/b8a14493-3d9f-4b9b-b93a-56d0bc7243e9" alt="" style={{ "--i": 4 }} />
        <img className="item" src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/03e51e1e-9750-45a5-b75e-a1e341d4562a" alt="" style={{ "--i": 10 }} />
        <span className="item" style={{ "--i": 11 }}></span>
        <img className="item" src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/5eb50f89-3e5a-480e-860c-8d40d3ba9ffe" alt="" style={{ "--i": 12 }} />
        <span className="item" style={{ "--i": 5 }}></span>
        <span className="item" style={{ "--i": 9 }}></span>
        <img className="item" src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/86c71a79-2efe-4567-8665-b1e5a1fd9735" alt="" style={{ "--i": 8 }} />
        <span className="item" style={{ "--i": 7 }}></span>
        <img className="item" src="https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/97ef9643-5202-41aa-80f0-ceeabccdd099" alt="" style={{ "--i": 6 }} />
      </div>
    </section>
  );
}

export default Home;
