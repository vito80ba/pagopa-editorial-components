/* eslint-disable @typescript-eslint/prefer-optional-chain */
import { useEffect, useState } from 'react';
import { Grid, Stack, Box, Typography, Container, Link } from '@mui/material';
import {
  type CompanyLinkType,
  type PreLoginFooterLinksType,
  type FooterLinksType,
} from './index';
import { LangSwitch, type LangSwitchProps } from './LangSwitch';
import { isRight, toError } from 'fp-ts/lib/Either';
import { hrefNoOp, wrapHandleExitAction } from '../../utils/index';

/* Icons */
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
/* import { MediumIcon } from '@icons/MediumIcon';
import { LogoPagoPACompany } from '@assets/LogoPagoPACompany';
import { FundedByNextGenerationEU } from '@assets/FundedByNextGenerationEU'; */

/* Enum */
import { ProductArrayType } from './ProductType';

type FooterProps = LangSwitchProps & {
  companyLink: CompanyLinkType;
  legalInfo: JSX.Element | JSX.Element[];
  links: PreLoginFooterLinksType;
  onExit?: (exitAction: () => void) => void;
  /** This URL contains a json with the list of products to list inside the Footer. By default it's set with https://selfcare.pagopa.it/assets/products.json */
  productsJsonUrl?: string;
  onProductsJsonFetchError?: (reason: any) => void;
  /** If true, it will not render the products column. As default, the column will be visible */
  hideProductsColumn?: boolean;
};

export const Footer = ({
  companyLink,
  legalInfo,
  links,
  onExit,
  productsJsonUrl = 'https://selfcare.pagopa.it/assets/products.json',
  onProductsJsonFetchError,
  hideProductsColumn,
  ...langProps
}: FooterProps): JSX.Element => {
  const { aboutUs, resources, followUs } = links;

  const [jsonProducts, setJsonProducts] = useState<FooterLinksType[]>([]);

  useEffect(() => {
    if (!hideProductsColumn) {
      fetch(productsJsonUrl)
        .then(async (r) => await r.json())
        .then((json) => {
          const decodeProducts = ProductArrayType.decode(json);
          if (isRight(decodeProducts)) {
            setJsonProducts(decodeProducts.right.slice());
          } else {
            throw toError(JSON.stringify(decodeProducts.left));
          }
        })
        .catch(
          onProductsJsonFetchError ??
            ((reason) => {
              console.error(reason);
            })
        );
    }
  }, []);

  type iconMapObject = Record<string, JSX.Element>;

  const iconMap: iconMapObject = {
    linkedin: <LinkedIcon />,
    twitter: <TwitterIcon />,
    instagram: <InstagramIcon />,
  };

  return (
    <Container>
      <Stack>
        <Box
          sx={{
            borderTop: 1,
            borderColor: 'divider',
            backgroundColor: 'background.paper',
          }}
        >
          <Container maxWidth={false} sx={{ py: 8 }}>
            <Grid container spacing={{ xs: 6, sm: 3 }}>
              <Grid item xs={12} sm={3}>
                <Stack spacing={2} alignItems={{ xs: 'center', sm: 'start' }}>
                  {companyLink && (
                    <Link
                      component="button"
                      aria-label={companyLink.ariaLabel}
                      href={companyLink.href ?? hrefNoOp}
                      onClick={wrapHandleExitAction(
                        companyLink.href ?? hrefNoOp,
                        companyLink.onClick,
                        onExit
                      )}
                      sx={{ display: 'inline-flex' }}
                    ></Link>
                  )}

                  <Stack
                    component="ul"
                    alignItems={{ xs: 'center', sm: 'start' }}
                    sx={{ padding: 0, listStyle: 'none' }}
                  >
                    {aboutUs?.links.map(
                      ({ href = hrefNoOp, label, ariaLabel, onClick }, i) => (
                        <li key={i}>
                          <Link
                            aria-label={ariaLabel}
                            component="a"
                            href={href}
                            onClick={wrapHandleExitAction(
                              href,
                              onClick,
                              onExit
                            )}
                            underline="none"
                            color="text.primary"
                            sx={{ display: 'inline-block', py: 0.5 }}
                            variant="subtitle2"
                          >
                            {label}
                          </Link>
                        </li>
                      )
                    )}
                  </Stack>
                </Stack>
              </Grid>
              {!hideProductsColumn && (
                <Grid item xs={12} sm={3}>
                  <Stack spacing={2} alignItems={{ xs: 'center', sm: 'start' }}>
                    {jsonProducts && (
                      <Typography variant="overline">
                        Prodotti e Servizi
                      </Typography>
                    )}

                    <Stack
                      component="ul"
                      alignItems={{ xs: 'center', sm: 'start' }}
                      sx={{ padding: 0, listStyle: 'none' }}
                    >
                      {jsonProducts &&
                        jsonProducts?.map(
                          (
                            { href = hrefNoOp, label, ariaLabel, onClick },
                            i
                          ) => (
                            <li key={i}>
                              <Link
                                aria-label={ariaLabel}
                                component="a"
                                href={href}
                                onClick={wrapHandleExitAction(
                                  href,
                                  onClick,
                                  onExit
                                )}
                                underline="none"
                                color="text.primary"
                                sx={{ display: 'inline-block', py: 0.5 }}
                                variant="subtitle2"
                              >
                                {label}
                              </Link>
                            </li>
                          )
                        )}
                    </Stack>
                  </Stack>
                </Grid>
              )}

              <Grid item xs={12} sm={3}>
                <Stack spacing={2} alignItems={{ xs: 'center', sm: 'start' }}>
                  {resources?.title && (
                    <Typography variant="overline">
                      {resources.title}
                    </Typography>
                  )}

                  <Stack
                    component="ul"
                    alignItems={{ xs: 'center', sm: 'start' }}
                    sx={{ padding: 0, listStyle: 'none' }}
                  >
                    {resources?.links.map(
                      ({ href = hrefNoOp, label, ariaLabel, onClick }, i) => (
                        <li key={i}>
                          <Link
                            aria-label={ariaLabel}
                            component="a"
                            href={href}
                            onClick={wrapHandleExitAction(
                              href,
                              onClick,
                              onExit
                            )}
                            underline="none"
                            color="text.primary"
                            sx={{ display: 'inline-block', py: 0.5 }}
                            variant="subtitle2"
                          >
                            {label}
                          </Link>
                        </li>
                      )
                    )}
                  </Stack>
                </Stack>
              </Grid>

              <Grid item xs={12} sm={3}>
                <Stack
                  spacing={3}
                  justifyContent="space-between"
                  sx={{ height: '100%' }}
                  alignItems={{ xs: 'center', sm: 'start' }}
                >
                  <Stack spacing={2} alignItems={{ xs: 'center', sm: 'start' }}>
                    {followUs?.title && (
                      <Typography variant="overline">
                        {followUs.title}
                      </Typography>
                    )}

                    <Stack alignItems={{ xs: 'center', sm: 'start' }}>
                      <Stack
                        spacing={{ xs: 3, sm: 1.5, lg: 3 }}
                        direction="row"
                        component="ul"
                        alignItems={{ xs: 'center', sm: 'start' }}
                        sx={{ padding: 0, mt: 0.5, listStyle: 'none' }}
                      >
                        {followUs?.socialLinks.map(
                          (
                            { icon, href = hrefNoOp, ariaLabel, onClick },
                            i
                          ) => (
                            <li key={i}>
                              <Link
                                aria-label={ariaLabel}
                                component="button"
                                href={href}
                                onClick={wrapHandleExitAction(
                                  href,
                                  onClick,
                                  onExit
                                )}
                                underline="none"
                                color="text.primary"
                                sx={{ display: 'inline-flex' }}
                                variant="caption"
                              >
                                {icon && iconMap[icon]}
                              </Link>
                            </li>
                          )
                        )}
                      </Stack>

                      <Stack
                        component="ul"
                        alignItems={{ xs: 'center', sm: 'start' }}
                        sx={{ padding: 0, margin: 0, listStyle: 'none' }}
                      >
                        {followUs?.links.map(
                          (
                            { href = hrefNoOp, label, ariaLabel, onClick },
                            i
                          ) => (
                            <li key={i}>
                              <Link
                                aria-label={ariaLabel}
                                component="button"
                                href={href}
                                onClick={wrapHandleExitAction(
                                  href,
                                  onClick,
                                  onExit
                                )}
                                underline="none"
                                color="text.primary"
                                sx={{ display: 'inline-block', py: 0.5 }}
                                variant="subtitle2"
                              >
                                {label}
                              </Link>
                            </li>
                          )
                        )}
                      </Stack>

                      <LangSwitch {...langProps} />
                      <FundedByNextGenerationEU size={180} />
                    </Stack>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Box
          sx={{
            borderTop: 1,
            borderColor: 'divider',
            backgroundColor: 'background.paper',
          }}
        >
          <Container sx={{ px: 2, py: 2 }}>
            <Typography
              color="text.primary"
              component="p"
              variant="caption"
              sx={{ textAlign: 'center' }}
            >
              {legalInfo}
            </Typography>
          </Container>
        </Box>
      </Stack>
    </Container>
  );
};