import Link from "next/link";

export default function Search() {
  return (
    <div className="my-2 card">
      <div className="card-body">
        <div className="card-text">
          <form action="//www.google.com" id="cse-search-box">
            <input
              type="hidden"
              name="cx"
              value="partner-pub-6208435820744910:5135878443"
            />
            <input type="hidden" name="ie" value="UTF-8" />
            <input type="text" name="q" className="form-control" />
            <input
              type="submit"
              name="sa"
              className="form-control"
              value="Search"
            />
          </form>
          <script
            async
            src="//www.google.com/coop/cse/brand?form=cse-search-box&amp;lang=en"
          />
        </div>
      </div>
    </div>
  );
}
