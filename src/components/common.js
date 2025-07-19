export async function fetchPageSpeed(url = "", strategy = "mobile") {
  const apiKey = "AIzaSyD8KqyU2gNEKNwmO9scS-xiQSqZAMP_ioU";
  const endpoint = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&strategy=${strategy}&key=${apiKey}`;

  try {
    const response = await fetch(endpoint);
    if (!response.ok)
      throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();

    return data;

    // return {
    //   performance: data.lighthouseResult.categories.performance.score * 100,
    //   seo: data.lighthouseResult.categories.seo.score * 100,
    //   accessibility: data.lighthouseResult.categories.accessibility.score * 100,
    //   bestPractices:
    //     data.lighthouseResult.categories["best-practices"].score * 100,
    //   coreWebVitals: {
    //     lcp: data.loadingExperience.metrics.LARGEST_CONTENTFUL_PAINT_MS?.percentile,
    //     fid: data.loadingExperience.metrics.FIRST_INPUT_DELAY_MS?.percentile,
    //     cls: data.loadingExperience.metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE?.percentile,
    //   },
    //   audits: data.lighthouseResult.audits,
    // };
  } catch (err) {
    console.error("PageSpeed API Error:", err);
    return null;
  }
}