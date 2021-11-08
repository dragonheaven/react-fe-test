import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReports } from '../state/features/reports/action';
import Header from '../components/Header';
import Table from '../components/Table';
import TextEdit from '../components/TextEdit';
import TagEdit from '../components/TagEdit';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { reports, social, isLoading } = useSelector((state) => state.reportsState);

  useEffect(() => {
    dispatch(getReports());
  }, []);

  const columns = [
    {
      label: 'No',
      value: 'key',
      render: (text) => <div className="text-sm text-black-600">{text}</div>,
    },
    {
      label: 'Name',
      value: 'name',
      render: (text, report) => (
        <TextEdit className="whitespace-nowrap w-full" text={text} name="name" id={report.id} />
      ),
    },
    {
      label: 'Preview',
      value: 'preview',
      render: (src) => (
        <div className="text-sm text-black-600">
          <img className="w-14 h-14 rounded bg-gray-500 mr-2" src={src} alt="" />
        </div>
      ),
    },
    {
      label: 'Title',
      value: 'title',
      render: (text, report) => (
        <TextEdit className="text-overflow w-96" name="title" text={text} id={report.id} multiline />
      ),
    },
    {
      label: 'Description',
      value: 'description',
      render: (text, report) => (
        <TextEdit className="text-overflow w-96" name="description" text={text} id={report.id} multiline />
      ),
    },
    {
      label: 'Owner',
      value: 'owner',
      render: (owner) => (
        <div className="text-sm text-black-600 flex items-center">
          <img className="w-8 h-8 rounded-full bg-gray-500 mr-2" src={owner.avatar_url} alt="" />
          {owner.name}
        </div>
      ),
    },
    {
      label: 'Tags',
      value: 'tags',
      render: (tags, report) => (<TagEdit tags={tags} id={report.id} name="tags" />),
    },
    {
      label: '#Views',
      value: 'views',
      render: (text, report) => (
        <TextEdit type="number" className="whitespace-nowrap w-full" text={text} name="views" id={report.id} />
      ),
    },
    {
      label: '#Comments',
      value: 'comments',
      render: (text) => <div className="text-sm text-black-600">{text}</div>,
    },
    {
      label: '#Stars',
      value: 'stars',
      render: (text, report) => (
        <TextEdit type="number" className="whitespace-nowrap w-full" text={text} name="stars" id={report.id} />
      ),
    },
  ];

  const dataSource = useMemo(() => {
    return reports.map((report, index) => {
      const socialData = social.find((item) => item.id === report.id);
      return ({
        id: report.id,
        key: index + 1,
        name: report.name,
        description: report.description,
        owner: report.owner,
        title: report.title,
        views: socialData ? socialData.views : 0,
        stars: socialData ? socialData.stars : 0,
        comments: socialData ? socialData.number_of_comments : 0,
        tags: report.tags,
      });
    });
  }, [reports, social]);

  return (
    <div className="h-screen has-background-gray font-sans pt-20">
      <Header />
      <div className="p-4">
        <Table data={dataSource} columns={columns} className="w-full" loading={isLoading} />
      </div>
    </div>
  );
};

export default DashboardPage;
