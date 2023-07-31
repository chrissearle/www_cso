import Script from "next/script";

export default function Search() {
  return (
    <div className="bg-base-100 p-4 form-control">
      <h2 className="mb-2 font-bold">Search</h2>

      <form action="//www.google.com" id="cse-search-box" className="w-full">
        <input
          type="hidden"
          name="cx"
          value={process.env.NEXT_PUBLIC_GOOGLE_CSE}
        />
        <input type="hidden" name="ie" value="UTF-8" />
        <input
          type="text"
          name="q"
          className="input input-sm w-auto input-bordered mr-2"
        />
        <input
          type="submit"
          name="sa"
          className="btn btn-sm rounded"
          value="Search"
        />
      </form>

      <Script
        src="//www.google.com/coop/cse/brand?form=cse-search-box&amp;lang=en"
        strategy="afterInteractive"
      />
    </div>
  );
}
