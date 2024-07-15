import React from "react";
import { IProcessedStyleSet } from "@fluentui/react";
import { IStyleSetBase } from "@fluentui/merge-styles";

export type LinkProps = {
  key: string;
  links: any[];
  isExpanded?: boolean;
  name?: string;
  url?: string;
  target?: string;
  icon?: any;
  scrollTop?: boolean | undefined;
  alternateText?: string;
  isShowMoreLink?: boolean;
  isHidden?: boolean;
  onClick?: (arg0: any, arg1: any) => void;
};

export interface NavBaseProps {
  initialSelectedKey: string | undefined;
  groups: any[];
  selectedKey?: string;
  onShowMoreLinkClicked?: () => void;
  styles?: IProcessedStyleSet<IStyleSetBase>;
  showMore?: boolean;
  theme?: string;
}

export interface NavBaseState {
  selectedKey?: string;
  isLinkExpandStateChanged?: boolean;
}

export class NavBase extends React.Component<NavBaseProps, NavBaseState> {
  _hasAtleastOneHiddenLink = false;

  getPreferredSelectedKey() {
    let selectedKey = "";
    // if caller passes in selectedKey, use it as first choice or use current state.selectedKey
    if (this.props.selectedKey) {
      selectedKey = this.props.selectedKey;
    } else if (this.state.selectedKey) {
      selectedKey = this.state.selectedKey;
    }
    return selectedKey;
  }

  /* given a link, find if one of the child is selected */
  isChildLinkSelected(link: LinkProps) {
    const selectedKey = this.getPreferredSelectedKey();
    if (!selectedKey || !link?.links?.length) {
      return false;
    }
    return (
      Array.isArray(link.links) &&
      link.links.some((childLink: { key: string }) => {
        return !!childLink && childLink.key === selectedKey;
      })
    );
  }

  // given a link and an optional includeChildren parameter, find if the link or any of the children is selected
  isLinkSelected(link: LinkProps, includeChildren: boolean) {
    const selectedKey = this.getPreferredSelectedKey();
    if (!selectedKey || !link) {
      return false;
    }
    // check if the link or any of the child link is selected
    return (
      link.key === selectedKey ||
      (includeChildren && this.isChildLinkSelected(link))
    );
  }

  getLinkText(link: LinkProps, showMore: any) {
    if (!link) {
      return undefined;
    }
    if (link.isShowMoreLink && !showMore && link.alternateText) {
      // if the link is show more/less link, based on the showMore state; return "Show more" localized text
      return link.alternateText;
    }
    return link.name;
  }

  // find if atleast one child link is visible using isHidden property
  // showMore flag will overwrite isHidden property
  hasAtleastOneVisibleLink(links: any[], showMore: any) {
    return (
      links?.length &&
      (links.some((link: { isHidden: boolean }) => {
        return !link.isHidden;
      }) ||
        !!showMore)
    );
  }
}
