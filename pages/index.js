import { getFeaturedEvents } from "../helpers/api-util";
import EventList from "../components/events/event-list";
import { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import NewsLetterRegistration from "../components/input/newsletter-registration";

const HomePage = (props) => {
  const { events } = props;

  return (
    <Fragment>
      <Head>
        <title>Events Dashboard</title>
        <meta
          name="description"
          content="Find a lot of events that allow you to evolve..."
        />
      </Head>
      <NewsLetterRegistration />
      <EventList items={events} />
    </Fragment>
  );
};

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800, //half hour, regenerate this page
  };
}

export default HomePage;
