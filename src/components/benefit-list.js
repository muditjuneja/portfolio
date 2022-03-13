import * as React from "react"
import { graphql } from "gatsby"
import {
  Container,
  Section,
  FlexList,
  Box,
  Icon,
  Heading,
  Text,
  Space,
  LinkList,
  Kicker
} from "./ui"

function Benefit(props) {
  return (
    // <Box as="li" width="quarter" padding={4} paddingY={3}>
    //   {props.image && (
    //     <Icon alt={props.image.alt} image={props.image} size="small" />
    //   )}
    //   <Space size={2} />
    //   <Heading variant="subheadSmall">{props.heading}</Heading>
    //   <Text>{props.text}</Text>
    // </Box>
    <Box center>
      {props.image && (
        <Icon alt={props.image.alt} image={props.image} size="large" />
      )}
      <Heading variant="subheadSmall">{props.heading}</Heading>
      <Text>{props.text}</Text>
      <LinkList links={props.links} />
    </Box>
  )
}

export default function BenefitList(props) {
  return (
    // <Section>
    //   <Container>
    //     <Box center>
    //       {props.heading && <Heading>{props.heading}</Heading>}
    //       {props.text && <Text variant="lead">{props.text}</Text>}
    //     </Box>
    //     <Space size={3} />
    //     <FlexList gutter={3} variant="start" responsive wrap>
    //       {props.content.map((benefit) => (
    //         <Benefit key={benefit.id} {...benefit} />
    //       ))}
    //     </FlexList>
    //   </Container>
    // </Section>
    <Section>
      <Container>
        <Box center paddingY={4}>
          <Heading>
            {/* {props.kicker && <Kicker>{props.kicker}</Kicker>} */}
            {props.heading}
          </Heading>
          {props.text && <Text>{props.text}</Text>}
        </Box>
        <FlexList gap={4} variant="responsive">
          {props.content.map((benefit) => (
            <li key={benefit.id}>
              <Benefit {...benefit} />
            </li>
          ))}
        </FlexList>
      </Container>
    </Section>
  )
}

export const query = graphql`
  fragment HomepageBenefitListContent on HomepageBenefitList {
    id
    heading
    text
    content {
      id
      heading
      text
      image {
        id
        gatsbyImageData
        alt
      }
    }
  }
`
