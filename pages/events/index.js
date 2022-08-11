import EventList from "../../components/events/event-list";
import EventSearch from "../../components/events/event-search";
import { Fragment } from "react";
import { useRouter } from "next/router";
import { getAllEvents } from "../../helpers/api-util";
import Head from 'next/head';

const EventSection = (props) => {
  const { featuredEvents } = props;

  const router = useRouter();

  function findEventHandler(year, month) {
    const fullPath = `events/${year}/${month}`;

    router.push(fullPath);
  }

  return (
    <Fragment>
      <Head>
        <title>All Events</title>
        <meta
          name="description"
          content="Find a lot of events that allow you to evolve..."
        />
      </Head>
      <EventSearch onSearch={findEventHandler} />
      <EventList items={featuredEvents} />
    </Fragment>
  );
};

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      featuredEvents: events,
    },
    revalidate: 60
  };
}

export default EventSection;
