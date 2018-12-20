import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "dva";
import { Tabs } from "antd";
import { router } from "utils";
import { stringify } from "qs";
import { withI18n } from "@lingui/react";
import { Page } from "components";
import Filter from "./components/Filter";
import List from "./components/List";

const { TabPane } = Tabs;

// const EnumPostStatus = {
//   UNPUBLISH: 1,
//   PUBLISHED: 2
// };

@withI18n()
@connect(({ app, post, loading }) => ({ app, post, loading }))
class Post extends PureComponent {
  render() {
    const { app, post, loading, location, i18n } = this.props;
    const { permissions } = app;
    const { list, pagination } = post;
    const { query, pathname } = location;

    const handleRefresh = newQuery => {
      router.push({
        pathname,
        search: stringify(
          {
            ...query,
            ...newQuery
          },
          { arrayFormat: "repeat" }
        )
      });
    };

    const filterProps = {
      filter: {
        ...query
      },
      onFilterChange(value) {
        handleRefresh({
          ...value,
          page: 1
        });
      }
    };

    const listProps = {
      permissions,
      pagination,
      dataSource: list,
      loading: loading.effects["post/query"],
      onChange(page) {
        router.push({
          pathname,
          search: stringify({
            ...query,
            page: page.current,
            pageSize: page.pageSize
          })
        });
      }
    };

    // const handleTabClick = key => {
    //   router.push({
    //     pathname,
    //     search: stringify({
    //       status: key
    //     })
    //   });
    // };

    return (
      <Page inner>
        <Filter {...filterProps} />
        {/* <Tabs
          activeKey={
            query.status === String(EnumPostStatus.UNPUBLISH)
              ? String(EnumPostStatus.UNPUBLISH)
              : String(EnumPostStatus.PUBLISHED)
          }
          onTabClick={handleTabClick}
        > */}
        {/* <TabPane
          tab={i18n.t`Publised`}
          key={String(EnumPostStatus.PUBLISHED)}
        > */}
        <List {...listProps} />
        {/* </TabPane> */}
        {/* <TabPane
            tab={i18n.t`Unpublished`}
            key={String(EnumPostStatus.UNPUBLISH)}
          >
            <List {...listProps} />
          </TabPane> */}
        {/* </Tabs> */}
      </Page>
    );
  }
}

Post.propTypes = {
  post: PropTypes.object,
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func
};

export default Post;
