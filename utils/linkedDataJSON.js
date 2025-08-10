module.exports.eventsPageLDJSON = JSON.stringify({
  "@context": "https://schema.org",
  "@type": ["WebPage", "ContactPage"],
  name: "Request a Quote - The Woodlands Latin Dance",
  description:
    "Request a quote for salsa or bachata classes for your event in The Woodlands or Greater Houston Area. Get pricing for private lessons, group classes, and event performances.",
  url: "https://www.thewoodlandslatindance.com/request-quote",
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.thewoodlandslatindance.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Request a Quote",
        item: "https://www.thewoodlandslatindance.com/request-quote",
      },
    ],
  },
  publisher: {
    "@type": "Organization",
    name: "The Woodlands Latin Dance",
    logo: {
      "@type": "ImageObject",
      url: "https://www.thewoodlandslatindance.com/res/images/logo.png",
    },
  },
  mainEntity: {
    "@type": "Organization",
    name: "The Woodlands Latin Dance",
    url: "https://www.thewoodlandslatindance.com",
    telephone: "+1-281-202-2058",
    address: {
      "@type": "PostalAddress",
      streetAddress: "25323 I-45",
      addressLocality: "Spring",
      addressRegion: "TX",
      postalCode: "77380",
      addressCountry: "US",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-281-202-2058",
      contactType: "sales",
      areaServed: ["US-TX"],
      availableLanguage: ["English", "Spanish"],
    },
  },
  potentialAction: {
    "@type": "QuoteAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://www.thewoodlandslatindance.com/request-quote",
      inLanguage: "en-US",
      actionPlatform: [
        "http://schema.org/DesktopWebPlatform",
        "http://schema.org/MobileWebPlatform",
      ],
    },
    result: {
      "@type": "Thing",
      name: "Custom Salsa/Bachata Event Quote",
    },
  },
});

module.exports.homePageLDJSON = (danceClasses) => {
  const events = getEvents(danceClasses);

  let ldjson = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "The Woodlands Latin Dance",
        url: "https://www.thewoodlandslatindance.com",
        logo: "https://www.thewoodlandslatindance.com/res/images/logo.png",
        description:
          "The Woodlands Latin Dance offers salsa and bachata classes for all levels. Join us for group classes, private lessons, and monthly packages in Spring, TX and The Woodlands, TX.",
        address: {
          "@type": "PostalAddress",
          streetAddress: "25323 I-45",
          addressLocality: "Spring",
          addressRegion: "TX",
          postalCode: "77380",
          addressCountry: "US",
        },
        telephone: "+1-281-202-2058",
        priceRange: "$$",
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Thursday"],
            opens: "19:00",
            closes: "22:00",
          },
        ],
        sameAs: [
          "https://www.facebook.com/profile.php?id=61568719342267",
          "https://www.instagram.com/thewoodlandslatindance/",
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Can I just show up?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Absolutely! Check out our schedule and come to the class of your choice.",
            },
          },
          {
            "@type": "Question",
            name: "What do I wear?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Athletic clothes that allow full range of motion and make you feel comfortable. Well-fitting sneakers or flats work great. Dance shoes or heels are optional—let’s get you started before investing in special footwear.",
            },
          },
          {
            "@type": "Question",
            name: "Do I need a partner?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No partner is required for any of the classes. We rotate leads and follows so everyone has a chance to practice.",
            },
          },
          {
            "@type": "Question",
            name: "How do I register for classes?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "You can register in advance online by visiting our registration page. If you prefer, you can also just show up, and we’ll take care of everything at the door!",
            },
          },
        ],
      },
    ],
  };
  events.forEach((event) => {
    ldjson["@graph"].push(event);
  });

  return JSON.stringify(ldjson);
};

function getMonthIndex(month) {
  const firstThreeLetters = month.slice(0, 3);
  return "JanFebMarAprMayJunJulAugSepOctNovDec".indexOf(firstThreeLetters) / 3;
}

function getStartEndDates(dates) {
  datesList = dates[0].dates.split(", ");
  const startDate = datesList[0].slice(0, -2);
  const endDate = datesList[datesList.length - 1].slice(0, -2);
  return [startDate, endDate];
}

function getEvents(classes) {
  const events = [];
  classes.forEach((danceClass) => {
    const monthIndex = getMonthIndex(danceClass.dates[0].month);
    const startEndDates = getStartEndDates(danceClass.dates);

    const startDate = new Date(
      new Date().getFullYear(),
      monthIndex,
      startEndDates[0],
      +danceClass.time.slice(0, -3) + 12
    );

    const endDate = new Date(
      new Date().getFullYear(),
      monthIndex,
      startEndDates[1],
      +danceClass.time.slice(0, -3) + 13
    );

    let event = {
      "@context": "https://schema.org",
      "@type": "Event",
      name: danceClass.title,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      location: {
        "@type": "Place",
        name: "The Woodlands Latin Dance",
        address: {
          "@type": "PostalAddress",
          streetAddress: danceClass.streetAddress,
          addressLocality: danceClass.addressLocality,
          addressRegion: danceClass.addressRegion,
          postalCode: danceClass.postalCode,
          addressCountry: "US",
        },
      },
      description: danceClass.description,
      organizer: {
        "@type": "Organization",
        name: "The Woodlands Latin Dance",
        url: "https://www.thewoodlandslatindance.com",
      },
      offers: {
        "@type": "Offer",
        url: "https://member.life/thewoodlandslatindance/register",
        price: "25",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        validFrom: startDate.toISOString(),
      },
    };
    events.push(event);
  });
  return events;
}
