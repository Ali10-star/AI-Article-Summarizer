import { logo } from "../assets";

const Hero = () => {
  return (
    <div className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full mb-10 pt-3">
        <img src={logo} alt="sumz_logo" className="w-28 object-contain" />
        <button
          type="button"
          style={{transition: 'all 0.3s ease-in-out'}}
          onClick={() => window.open("link to project")}
          className="black_btn"
        >
          Github Repo
        </button>
      </nav>

      <h1 className="head_text">
        Summarize Articles with <br className="max-md:hidden" />
        <span className="orange_gradient">OpenAI GPT-4</span>
      </h1>
      <h2 className="desc">
        Simplify your reading with Summize, an open-source article summarizer
        that transforms lengthy articles into clear and concise summaries
      </h2>
    </div>
  );
};

export default Hero;
