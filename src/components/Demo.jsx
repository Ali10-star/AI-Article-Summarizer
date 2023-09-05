import { useState, useEffect } from "react";
import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";

const Demo = () => {
  const [article, setArticle] = useState({
    url: '',
    summary: ''
  });
  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState("");

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();


  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(localStorage.getItem('articles'));
    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { data } = await getSummary({
      articleUrl: article.url
    });

    if (data?.summary) {
      const newArticle = { ... article, summary: data.summary };
      const updatedAllArticles = [newArticle, ...allArticles];
      localStorage.setItem('articles', JSON.stringify(updatedAllArticles));

      setAllArticles(updatedAllArticles);
      setArticle(newArticle);
    }
  }

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000);
  }

  return (
    <section className="mt-10 w-full max-w-xl">
      <div className="flex flex-col w-full gap-2">
        <form
          action=""
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt="link_icon"
            className="absolute left-0 my-2 ml-3 w-5"
          />

          <input
            type="url"
            name=""
            value={article.url}
            onChange={(event) => setArticle({ ...article, url: event.target.value })}
            placeholder="Enter a URL"
            required
            className="url_input peer"
          />

          <button
           style={{transition: 'all 0.3s ease'}}
           type="submit"
           className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
          >
            <p>↵</p>
          </button>
        </form>

        {/* Article history section */}
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((article, index) => (
            <div key={`link-${index}`} onClick={() => setArticle(article)} className="link_card">
              <div className="copy_btn" onClick={() => handleCopy(article.url)}>
                <img
                 src={copied === article.url ? tick : copy}
                 alt="copy_icon"
                 className="w-[40%] h-[40%] object-contain"
                />
              </div>
              <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                {article.url}
              </p>
            </div>
          ))}
        </div>

      </div>

      {/* Summary Display */}
      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <img src={loader} alt="loader" className="w-10 h-10" />
          ) : error ? (
            <p className="font-inter font-bold text-black text-center">
              An error occurred when fetching article summary.
              (This is possibly happening because this app is using a free test plan of the API with 50 monthly calls allowed)
              <br />
              <span className="font-satoshi font-normal text-gray-700">{error?.data?.error}</span>
            </p>
          ) : (
            article.summary && (
              <div className="flex flex-col gap-3">
                <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                  Article <span className="blue_gradient">Summary</span>
                </h2>
                <div className="summary_box">
                  <p className="font-inter font-medium text-base text-gray-700">
                    {article.summary}
                  </p>
                </div>
              </div>
            )
          )
        }
      </div>
    </section>
  );
};

export default Demo;
