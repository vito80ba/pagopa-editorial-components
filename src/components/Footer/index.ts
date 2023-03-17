// We need to validate this. It might be possible that the fields differ from product to product

/* export type LangCode = 'it' | 'en' | 'de' | 'fr' | 'sl';
export type Languages = Partial<Record<LangCode, LangLabels>> & {
  it: LangLabels;
};
export type LangLabels = Partial<Record<LangCode, string>> & { it: string };

export interface LangSwitchProps {
  currentLangCode?: LangCode;
  languages: Languages;
  onLanguageChanged: (newLang: LangCode) => void;
} */

/* type FooterProps = LangSwitchProps & {
  loggedUser: boolean;
  companyLink: CompanyLinkType;
  postLoginLinks: FooterLinksType[];
  preLoginLinks: PreLoginFooterLinksType;
  legalInfo: JSX.Element | JSX.Element[];
  onExit?: (exitAction: () => void) => void;
  productsJsonUrl?: string;
  onProductsJsonFetchError?: (reason: any) => void;
  hideProductsColumn?: boolean;
}; */
import * as t from 'io-ts';

export type LinkType = 'internal' | 'external';

export interface FooterLinksType {
  label: string;
  /** the url to witch the user will be redirect */
  href?: string;
  ariaLabel: string;
  linkType: LinkType;
  /** if defined it will override the href behavior */
  onClick?: () => void;
}

export interface PreLoginFooterSingleSectionType {
  title?: string;
  links: FooterLinksType[];
}

export interface PreLoginFooterSocialLink {
  icon: string;
  /** the url to witch the user will be redirect */
  href?: string;
  title: string;
  ariaLabel: string;
  /** if defined it will override the href behavior */
  onClick?: () => void;
}

export interface PreLoginFooterLinksType {
  aboutUs: PreLoginFooterSingleSectionType;
  resources: PreLoginFooterSingleSectionType;
  followUs: {
    title: string;
    socialLinks: PreLoginFooterSocialLink[];
    links: FooterLinksType[];
  };
}

export interface CompanyLinkType {
  /** the url to witch the user will be redirect */
  href?: string;
  ariaLabel: string;
  /** if defined it will override the href behavior */
  onClick?: () => void;
}

export class EnumType<A> extends t.Type<A> {
  public readonly _tag = 'EnumType' as const;
  public enumObject!: object;
  public constructor(e: object, name?: string) {
    super(
      name ?? 'enum',
      (u): u is A => {
        if (!Object.values(this.enumObject).find((v) => v === u)) {
          return false;
        }
        // enum reverse mapping check
        if (typeof (this.enumObject as any)[u as string] === 'number') {
          return false;
        }
        return true;
      },
      (u, c) => (this.is(u) ? t.success(u) : t.failure(u, c)),
      t.identity
    );
    this.enumObject = e;
  }
}
export function createEnumType<T>(e: object, name?: string) {
  return new EnumType<T>(e, name);
}
