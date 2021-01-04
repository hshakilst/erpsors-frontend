import React from "react";
import BaseLayout from "@/components/layouts/baseLayout";

export default class Dashboard extends React.Component {
  render() {
    return (
      <BaseLayout className="dashboard">
        <h1>I am dashboard page!</h1>
      </BaseLayout>
    );
  }
}

