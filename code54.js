$(document).ready(function () {
    let page = 1;
    let currentCategory = "all"; // Track the current category
    let searchHistory = []; // Store search history

    // Site map for known redirects
    const siteMap = {
        "google": "https://www.google.com",
        "youtube": "https://www.youtube.com",
        // (rest of the sites...)
    };

    // Function to fetch combined results from multiple search engines
    function fetchCombinedResults(query) {
        $("#resultsContainer").empty(); // Clear previous results
        let combinedResults = [];

        fetchDuckDuckGoResults(query, function (duckduckgoResults) {
            combinedResults = combinedResults.concat(duckduckgoResults);
            fetchYandexResults(query, function (yandexResults) {
                combinedResults = combinedResults.concat(yandexResults);
                fetchEcosiaResults(query, function (ecosiaResults) {
                    combinedResults = combinedResults.concat(ecosiaResults);
                    fetchBingResults(query, function (bingResults) {
                        combinedResults = combinedResults.concat(bingResults);
                        fetchGoogleResults(query, function (googleResults) {
                            combinedResults = combinedResults.concat(googleResults);
                            fetchYahooResults(query, function (yahooResults) {
                                combinedResults = combinedResults.concat(yahooResults);
                                fetchAOLResults(query, function (aolResults) {
                                    combinedResults = combinedResults.concat(aolResults);
                                    fetchDogpileResults(query, function (dogpileResults) {
                                        combinedResults = combinedResults.concat(dogpileResults);
                                        fetchBoardreaderResults(query, function (boardreaderResults) {
                                            combinedResults = combinedResults.concat(boardreaderResults);
                                            fetchAskResults(query, function (askResults) {
                                                combinedResults = combinedResults.concat(askResults);
                                                fetchBaiduResults(query, function (baiduResults) {
                                                    combinedResults = combinedResults.concat(baiduResults);
                                                    fetchNaverResults(query, function (naverResults) {
                                                        combinedResults = combinedResults.concat(naverResults);
                                                        fetchSogouResults(query, function (sogouResults) {
                                                            combinedResults = combinedResults.concat(sogouResults);
                                                            combinedResults.sort(() => Math.random() - 0.5); // Randomly shuffle results to mix
                                                            displayResults(combinedResults); // Display combined results
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    }

    // Function to fetch DuckDuckGo results with relevant topics
    function fetchDuckDuckGoResults(query, callback) {
        const duckDuckGoLink = `https://api.duckduckgo.com/?q=${query}&format=json&pretty=1&no_html=1&skip_disambig=1&callback=?`;
        $.ajax({
            url: duckDuckGoLink,
            dataType: "jsonp",
            success: function (data) {
                let results = [];
                if (data.RelatedTopics && data.RelatedTopics.length > 0) {
                    for (let i = 0; i < data.RelatedTopics.length; i++) {
                        const result = data.RelatedTopics[i];
                        if (result.Text && result.FirstURL) {
                            results.push({
                                source: 'DuckDuckGo',
                                title: result.Text,
                                url: result.FirstURL,
                                snippet: result.Text,
                                relevantTopics: result.Topics || [] // Collect relevant topics if available
                            });
                        }
                    }
                }
                callback(results);
            },
            error: function (error) {
                console.error("Error fetching DuckDuckGo results: ", error);
            }
        });
    }

    // Function to fetch Ask results
    function fetchAskResults(query, callback) {
        const askLink = `https://www.ask.com/web?q=${encodeURIComponent(query)}`;
        callback([{ source: 'Ask.com', title: `Search Ask.com for "${query}"`, url: askLink, snippet: 'Click to search Ask.com.', relevantTopics: [] }]);
    }

    // Function to fetch Yandex results
    function fetchYandexResults(query, callback) {
        const yandexLink = `https://yandex.com/search/?text=${encodeURIComponent(query)}`;
        callback([{ source: 'Yandex', title: `Search Yandex for "${query}"`, url: yandexLink, snippet: 'Click to search Yandex.', relevantTopics: [] }]);
    }

    // Function to fetch Ecosia results
    function fetchEcosiaResults(query, callback) {
        const ecosiaLink = `https://www.ecosia.org/search?q=${encodeURIComponent(query)}`;
        callback([{ source: 'Ecosia', title: `Search Ecosia for "${query}"`, url: ecosiaLink, snippet: 'Click to search Ecosia.', relevantTopics: [] }]);
    }

    // Function to fetch Bing results
    function fetchBingResults(query, callback) {
        const bingLink = `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
        callback([{ source: 'Bing', title: `Search Bing for "${query}"`, url: bingLink, snippet: 'Click to search Bing.', relevantTopics: [] }]);
    }

    // Function to fetch Google results
    function fetchGoogleResults(query, callback) {
        const googleLink = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        callback([{ source: 'Google', title: `Search Google for "${query}"`, url: googleLink, snippet: 'Click to search Google.', relevantTopics: [] }]);
    }

    // Function to fetch Yahoo results
    function fetchYahooResults(query, callback) {
        const yahooLink = `https://search.yahoo.com/search?p=${encodeURIComponent(query)}`;
        callback([{ source: 'Yahoo', title: `Search Yahoo for "${query}"`, url: yahooLink, snippet: 'Click to search Yahoo.', relevantTopics: [] }]);
    }

    // Function to fetch AOL results
    function fetchAOLResults(query, callback) {
        const aolLink = `https://search.aol.com/aol/search?q=${encodeURIComponent(query)}`;
        callback([{ source: 'AOL', title: `Search AOL for "${query}"`, url: aolLink, snippet: 'Click to search AOL.', relevantTopics: [] }]);
    }

    // Function to fetch Dogpile results
    function fetchDogpileResults(query, callback) {
        const dogpileLink = `https://www.dogpile.com/search/web?q=${encodeURIComponent(query)}`;
        callback([{ source: 'Dogpile', title: `Search Dogpile for "${query}"`, url: dogpileLink, snippet: 'Click to search Dogpile.', relevantTopics: [] }]);
    }

    // Function to fetch Boardreader results
    function fetchBoardreaderResults(query, callback) {
        const boardreaderLink = `https://boardreader.com/search?q=${encodeURIComponent(query)}`;
        callback([{ source: 'Boardreader', title: `Search Boardreader for "${query}"`, url: boardreaderLink, snippet: 'Click to search Boardreader.', relevantTopics: [] }]);
    }

    // Function to fetch Baidu results
    function fetchBaiduResults(query, callback) {
        const baiduLink = `https://www.baidu.com/s?wd=${encodeURIComponent(query)}`;
        callback([{ source: 'Baidu', title: `Search Baidu for "${query}"`, url: baiduLink, snippet: 'Click to search Baidu.', relevantTopics: [] }]);
    }

    // Function to fetch Naver results
    function fetchNaverResults(query, callback) {
        const naverLink = `https://search.naver.com/search.naver?query=${encodeURIComponent(query)}`;
        callback([{ source: 'Naver', title: `Search Naver for "${query}"`, url: naverLink, snippet: 'Click to search Naver.', relevantTopics: [] }]);
    }

    // Function to fetch Sogou results
    function fetchSogouResults(query, callback) {
        const sogouLink = `https://www.sogou.com/web?query=${encodeURIComponent(query)}`;
        callback([{ source: 'Sogou', title: `Search Sogou for "${query}"`, url: sogouLink, snippet: 'Click to search Sogou.', relevantTopics: [] }]);
    }

    // Function to display results
    function displayResults(results) {
        if (results.length === 0) {
            $("#resultsContainer").append('<p>No results found.</p>');
        } else {
            results.forEach(result => {
                $("#resultsContainer").append(
                    `<div class="searchResult">
                        <a href="${result.url}" target="_blank" style="text-decoration:none">
                            <strong>[${result.source}] ${result.title}</strong><br>
                            <span>${result.snippet}</span><br>
                            <span style="color:green;">${result.url}</span>
                        </a>
                        ${result.relevantTopics && result.relevantTopics.length > 0 ? '<p>Relevant Topics: ' + result.relevantTopics.join(', ') + '</p>' : ''}
                    </div>`
                );
            });
        }
    }

    // Function to check if the query matches one of the known sites
    function checkForKnownSite(query) {
        const siteKey = query.toLowerCase();
        if (siteMap[siteKey]) {
            window.open(siteMap[siteKey], '_blank');
        } else {
            return false;
        }
        return true;
    }

    // Function to show search history
    function showSearchHistory() {
        $("#resultsContainer").empty(); // Clear current results
        if (searchHistory.length === 0) {
            $("#resultsContainer").append('<p>No search history available.</p>');
        } else {
            searchHistory.forEach(query => {
                $("#resultsContainer").append(`<p>${query}</p>`);
            });
        }
    }

    // Search button click event
    $("#searchBtn").click(function () {
        const query = $("#search").val().trim();
        $("#resultsContainer").empty(); // Clear previous results

        if (checkForKnownSite(query)) {
            return;
        }

        searchHistory.push(query); // Add the query to search history
        fetchCombinedResults(query);
    });

    // Enter key press event
    $("#search").keypress(function (e) {
        if (e.which == 13) {
            const query = $("#search").val().trim();
            $("#resultsContainer").empty(); // Clear previous results

            if (checkForKnownSite(query)) {
                return;
            }

            searchHistory.push(query); // Add the query to search history
            fetchCombinedResults(query);
        }
    });

    // Search history button click event
    $("#searchHistoryBtn").click(function () {
        showSearchHistory();
    });
});
