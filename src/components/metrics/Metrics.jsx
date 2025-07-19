import React from "react";
import {
  CLSChart,
  FCPChart,
  INPChart,
  LCPChart,
  TTFBChart,
} from "./MetricWrapper";
import styled from "@emotion/styled";

const StyledWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`;
const StyledDiv = styled.div`
  width: 25%;
`;
export const MetricsDashboard = ({ metrics }) => {
  return (
    <StyledWrap>
      <StyledDiv>
        <CLSChart metric={metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE} />
      </StyledDiv>
      <StyledDiv>
        <TTFBChart metric={metrics.EXPERIMENTAL_TIME_TO_FIRST_BYTE} />
      </StyledDiv>
      <StyledDiv>
        <FCPChart metric={metrics.FIRST_CONTENTFUL_PAINT_MS} />
      </StyledDiv>

      <StyledDiv>
        <LCPChart metric={metrics.LARGEST_CONTENTFUL_PAINT_MS} />
      </StyledDiv>

      <StyledDiv>
        <INPChart metric={metrics.INTERACTION_TO_NEXT_PAINT} />
      </StyledDiv>
    </StyledWrap>
  );
};
