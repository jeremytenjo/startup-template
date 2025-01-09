import React from 'react'
// https://react.email/docs/components/container
import { Html } from '@react-email/html'
import { Link } from '@react-email/link'
import { Text as EmailText } from '@react-email/text'
import { Img } from '@react-email/img'
import { Container } from '@react-email/container'
import { Section } from '@react-email/section'
import { Row } from '@react-email/row'
import { Column } from '@react-email/column'
import { Head } from '@react-email/head'

import appConfig from '../../../../../app.config.js'
import colors from '../../../../theme/tokens/colors.js'

export type BasicEmailTemplateProps = {
  title: string
  receiverName: string
  body: string | undefined
  ctas?: {
    href: string
    label: string
  }[]
  senderImageUrl?: string
}

export default function BasicEmailTemplate(props: BasicEmailTemplateProps) {
  return (
    <Html
      lang='en'
      style={{
        padding: '60px 10px',
      }}
    >
      <Head>
        <meta name='color-scheme' content='dark' />
        <meta name='supported-color-schemes' content='dark' />
      </Head>

      <Container
        style={{
          maxWidth: '670px',
        }}
      >
        {/* Header */}
        <Container
          style={{
            marginBottom: '5px',
          }}
        >
          <Section>
            <Row>
              <Column>
                <Text
                  text={`Hi ${props.receiverName},`}
                  sx={{
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#B6C1D1',
                  }}
                />
              </Column>

              <Column align='right'>
                <Link href={appConfig.siteInfo?.domain}>
                  <Img
                    src={`${appConfig.siteInfo?.domain}/images/logo/fullLogo.png`}
                    alt={`${appConfig.siteInfo?.name} Logo`}
                  />
                </Link>
              </Column>
            </Row>
          </Section>
        </Container>

        {/* Body */}
        <Container
          style={{
            backgroundColor: '#0D0E10',
            borderTopLeftRadius: '14px',
            borderTopRightRadius: '14px',
            padding: '50px 85px',
          }}
        >
          {/* Title */}
          <Container>
            <Text
              text={props.title}
              sx={{
                fontSize: '28px',
                textAlign: 'center',
                fontWeight: 'bold',
                lineHeight: '40px',
                marginBottom: '30px',
              }}
            />
          </Container>

          {/* Sender Image */}
          {props.senderImageUrl && (
            <Img
              src={props.senderImageUrl}
              alt='sender image'
              width={50}
              height={50}
              style={{
                borderRadius: '100px',
                margin: 'auto',
              }}
            />
          )}

          {/* Body */}
          {props.body ? (
            <Text
              text={props.body}
              sx={{
                fontSize: '15px',
                textAlign: 'center',
              }}
            />
          ) : null}

          {/* CTAS */}
          {props.ctas?.length && (
            <Row
              style={{
                margin: 'auto',
                width: 'fit-content',
                marginTop: '30px',
              }}
            >
              {props.ctas?.map((cta, index) => {
                const prefix = cta.href.startsWith('/') ? appConfig.siteInfo?.domain : ''
                return (
                  <Column
                    key={cta.label}
                    style={{
                      margin: 'auto',
                    }}
                  >
                    <Link
                      href={`${prefix}${cta.href}`}
                      style={{
                        backgroundColor: colors.primary.main,
                        color: 'white',
                        borderRadius: '20px',
                        width: 'fit-content',
                        fontWeight: 'bold',
                        height: 'fit-content',
                        padding: '7px 16px',
                        fontSize: '12px',
                        border: `1px solid ${colors.primary.light}`,
                        ...(index > 0 && {
                          marginLeft: '10px',
                        }),
                      }}
                    >
                      {cta.label}
                    </Link>
                  </Column>
                )
              })}
            </Row>
          )}
        </Container>

        <Footer />
      </Container>
    </Html>
  )
}

// Containers

const Footer = () => {
  return (
    <Container
      style={{
        backgroundColor: '#000000',
        borderBottomLeftRadius: '14px',
        borderBottomRightRadius: '14px',
        padding: '20px',
      }}
    >
      <Row
        style={{
          margin: 'auto',
          width: 'fit-content',
        }}
      >
        <Column
          style={{
            marginRight: '20px',
          }}
        >
          <Img
            src={`${appConfig.siteInfo?.domain}/images/logo/logo-leaf.png`}
            alt={`${appConfig.siteInfo?.name} Logo`}
          />
        </Column>

        <Column>
          <Text
            text={`${appConfig.siteInfo.name} LLC`}
            sx={{
              fontSize: '14px',
            }}
          />
        </Column>
      </Row>

      <Row
        style={{
          margin: 'auto',
          width: 'fit-content',
        }}
      >
        <Column>
          <Link
            href={appConfig.siteInfo.domain + '/privacy-policy'}
            style={{
              ...commonLinkStyles,
            }}
          >
            Privacy Policy
          </Link>
        </Column>

        <Column>
          <LinkDivider />
        </Column>

        <Column>
          <Link
            href={`${appConfig.siteInfo.domain}/settings/notifications?unsubscribe=email`}
            style={{
              ...commonLinkStyles,
            }}
          >
            Unsubscribe
          </Link>
        </Column>

        <Column>
          <LinkDivider />
        </Column>

        <Column>
          <Link
            href={appConfig.socialLinks.mailto.link}
            style={{
              ...commonLinkStyles,
            }}
          >
            Contact Us
          </Link>
        </Column>
      </Row>

      <Container>
        <Text
          text={appConfig.business.address}
          sx={{
            textAlign: 'center',
            fontSize: '14px',
          }}
        />
      </Container>

      <Row
        style={{
          margin: 'auto',
          width: 'fit-content',
        }}
      >
        <Column>
          <Link href={appConfig.socialLinks.discord.link}>
            <Img
              src={`${appConfig.siteInfo?.domain}/images/socials/discord.png`}
              alt='discord'
              width={21}
              height={16}
            />
          </Link>
        </Column>

        <Column>
          <Link href={appConfig.socialLinks.twitter.link}>
            <Img
              src={`${appConfig.siteInfo?.domain}/images/socials/x.png`}
              alt='x'
              width={14}
              height={15}
              style={{
                marginLeft: '15px',
              }}
            />
          </Link>
        </Column>
      </Row>

      <Link
        href={appConfig.siteInfo.domain}
        style={{
          ...commonLinkStyles,
        }}
      >
        <Text
          text={`www.thebloxmarket.com`}
          sx={{
            textAlign: 'center',
            textDecoration: 'underline',
            ...commonLinkStyles,
          }}
        />
      </Link>
    </Container>
  )
}

// components

const LinkDivider = () => {
  return (
    <Text
      text='|'
      sx={{
        margin: 'auto 10px',
        display: 'block',
      }}
    />
  )
}

const commonLinkStyles = {
  color: colors.primary.main,
  fontSize: '14px',
}

const Text = (props: { text: string; sx?: React.CSSProperties }) => {
  return (
    <EmailText
      style={{
        color: 'white',
        ...props.sx,
      }}
    >
      {props.text}
    </EmailText>
  )
}
