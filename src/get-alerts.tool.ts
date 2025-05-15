import type { AlertsResponse } from "./interfaces.js";
import { makeNWSRequest, formatAlert } from "./helpers.js";

export const getToolToGetAlerts = (url: string) => async ({ state }: { state: string }) => {
  const stateCode = state.toUpperCase();
  const alertsUrl = `${url}/alerts?area=${stateCode}`;
  const alertsData = await makeNWSRequest<AlertsResponse>(alertsUrl);

  if (!alertsData) {
    return {
      content: [
        {
          type: "text",
          text: "Failed to retrieve alerts data",
        },
      ],
    };
  }

  const features = alertsData.features || [];
  if (features.length === 0) {
    return {
      content: [
        {
          type: "text",
          text: `No active alerts for ${stateCode}`,
        },
      ],
    };
  }

  const formattedAlerts = features.map(formatAlert);
  const alertsText = `Active alerts for ${stateCode}:\n\n${formattedAlerts.join("\n")}`;

  return {
    content: [
      {
        type: "text",
        text: alertsText,
      },
    ],
  };
};