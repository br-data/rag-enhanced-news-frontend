import React, { ComponentClass } from "react";
import {
  AnimationClassNames,
  classNamesFunction,
  styled,
  IProcessedStyleSet,
} from "@fluentui/react";
import { IStyleSetBase } from "@fluentui/merge-styles";

import { getStyles } from "./Nav.styles";
import { LinkProps, NavBase, NavBaseProps, NavBaseState } from "./NavBase";
import { NavLink } from "./NavLink";

const getClassNames = classNamesFunction();

class NavComponent extends NavBase {
  state: NavBaseState;

  constructor(props: NavBaseProps) {
    super(props);
    this.state = {
      isLinkExpandStateChanged: false,
      selectedKey: props.initialSelectedKey || props.selectedKey,
    };
  }

  render() {
    if (!this.props.groups?.length) {
      return null;
    }
    // reset the flag
    // on render link, find if there is at least one hidden link to display "Show more" link
    this._hasAtleastOneHiddenLink = false;
    return (
      <>
        {this.props.groups.map((group: any, groupIndex: any) => {
          return this._renderGroup(group, groupIndex);
        })}
      </>
    );
  }

  _onLinkClicked(link: LinkProps, ev: React.MouseEvent<HTMLElement>) {
    let nextState = {
      selectedKey: link.key,
      isLinkExpandStateChanged: false,
    };

    const hasChildren = link.links?.length;

    if (hasChildren) {
      // show child links
      link.isExpanded = !link.isExpanded;
      nextState.isLinkExpandStateChanged = true;
    } else if (link.onClick) {
      link.onClick(ev, link);
    }

    this.setState(nextState);

    // prevent further action if the link has children or onClick handler is defined
    // if (hasChildren || link.onClick()) {
    if (hasChildren) {
      ev.preventDefault();
    }

    ev.stopPropagation();
  }

  _renderCompositeLink(link: LinkProps, linkIndex: any, nestingLevel: number) {
    const { onShowMoreLinkClicked, styles, showMore, theme } = this.props;

    if (!link) {
      return null;
    }

    let rightIconName = undefined;
    let ariaProps = {};
    if (link.links && link.links.length > 0 && nestingLevel === 0) {
      // for the first level link, show chevron icon if there is a children
      rightIconName = link.isExpanded ? "ChevronUp" : "ChevronDown";
      ariaProps = { ariaExpanded: !!link.isExpanded };
    } else if (link.url && link.target === "_blank") {
      // for external links, show an icon
      rightIconName = "OpenInNewWindow";
    }

    // show nav icon for the first level only
    const leftIconName = nestingLevel === 0 ? link.icon : undefined;
    const isLinkSelected = this.isLinkSelected(
      link,
      false /* includeChildren */,
    );
    const isChildLinkSelected = this.isChildLinkSelected(link);
    const hasChildren = link.links?.length;
    const isSelected =
      (isLinkSelected && !hasChildren) ||
      (isChildLinkSelected && !link.isExpanded);
    const classNames: IProcessedStyleSet<IStyleSetBase> & {
      navItemRoot?: string;
      navItemNameColumn?: string;
      navItemIconColumn?: string;
      navItemBarMarker?: string;
      focusedStyle?: string;
    } = getClassNames(styles, {
      isSelected,
      nestingLevel,
      isChildLinkSelected,
      theme,
    });
    const linkText = this.getLinkText(link, showMore);
    const onClickHandler =
      link.isShowMoreLink && onShowMoreLinkClicked
        ? onShowMoreLinkClicked
        : this._onLinkClicked.bind(this, link);

    return (
      <NavLink
        id={link.key}
        content={linkText}
        href={link.url!}
        target={link.target!}
        onClick={onClickHandler}
        dataValue={link.key}
        ariaLabel={linkText}
        {...ariaProps}
        role="menu"
        leftIconName={leftIconName}
        rightIconName={rightIconName}
        rootClassName={classNames.navItemRoot!}
        textClassName={classNames.navItemNameColumn!}
        iconClassName={classNames.navItemIconColumn!}
        barClassName={classNames.navItemBarMarker!}
        focusedStyle={classNames.focusedStyle!}
      />
    );
  }

  _renderLink(link: LinkProps, linkIndex: any, nestingLevel: number) {
    if (!link) {
      return null;
    }

    const linkText = this.getLinkText(link, this.props.showMore);

    return (
      <li key={link.key || linkIndex} title={linkText}>
        {this._renderCompositeLink(link, linkIndex, nestingLevel)}
        {
          // show child links
          // 1. only for the first level and
          // 2. if the link is expanded
          nestingLevel === 0 && link.isExpanded ? (
            <div className={AnimationClassNames.slideDownIn20}>
              {this._renderLinks(link.links, ++nestingLevel)}
            </div>
          ) : null
        }
      </li>
    );
  }

  _renderLinks(links: LinkProps[], nestingLevel: number) {
    if (!Array.isArray(links)) {
      links = [];
    }
    if (!links.length) {
      return null;
    }
    const { showMore } = this.props;
    return (
      <ul>
        {links.map((link: LinkProps, linkIndex: any) => {
          if (link.isHidden && !showMore) {
            // atleast one link is hidden
            this._hasAtleastOneHiddenLink = true;

            // "Show more" overrides isHidden property
            return null;
          } else if (
            link.isShowMoreLink &&
            !this._hasAtleastOneHiddenLink &&
            !showMore
          ) {
            // there is no hidden link, hide "Show more" link
            return null;
          } else {
            return this._renderLink(link, linkIndex, nestingLevel);
          }
        })}
      </ul>
    );
  }

  _renderGroup(
    group: {
      links: LinkProps[];
      name: string;
    },
    groupIndex: React.Key | null | undefined,
  ) {
    const { styles, theme } = this.props;

    if (!group?.links?.length) {
      return null;
    }

    const hasGroupName = !!group.name;

    const classNames: IProcessedStyleSet<IStyleSetBase> & {
      navGroupSeparatorRoot?: string;
      navGroupSeparatorHrLine?: string;
      navGroupSeparatorHeaderGroupName?: string;
    } = getClassNames(styles, { hasGroupName, theme });

    // first group header is hidden by default, display group header for other groups only if there are visible links
    let isGroupHeaderVisible = false;
    if ((groupIndex as number) > 0) {
      isGroupHeaderVisible = !!this.hasAtleastOneVisibleLink(
        group.links,
        this.props.showMore,
      );
    }

    return (
      <div key={groupIndex}>
        {isGroupHeaderVisible ? (
          <div className={classNames.navGroupSeparatorRoot}>
            <div className={classNames.navGroupSeparatorHrLine}>
              {group.name ? (
                <span className={classNames.navGroupSeparatorHeaderGroupName}>
                  {group.name}
                </span>
              ) : null}
            </div>
          </div>
        ) : null}
        {this._renderLinks(group.links, 0 /* nestingLevel */)}
      </div>
    );
  }
}

export const Nav = styled(NavComponent as ComponentClass<any>, getStyles);
