import { Button, Collapse, IResizeEntry, ResizeSensor } from '@blueprintjs/core';
import moment from 'moment';
import React, { FunctionComponent, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { dateFilter, textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
// @ts-ignore
import variables from '../../index.scss';
import { minDeskTopWidth } from '../../utils/util';

const dateFormatter = (cell: string) => {
	return <span>{moment(cell).format('MM/DD/YYYY h:mm:ss a').toString()}</span>;
};

const tableData = [
	{
		id: 0,
		user: 'Rosemary',
		fileAccessed: 'Carver.pdf',
		date: 'Sat Jun 11 2011 18:57:45 GMT+0000 (UTC)',
	},
	{
		id: 1,
		user: 'Vang',
		fileAccessed: 'Becker.pdf',
		date: 'Sun May 07 1972 14:30:24 GMT+0000 (UTC)',
	},
	{
		id: 2,
		user: 'Reid',
		fileAccessed: 'Barker.pdf',
		date: 'Thu Oct 21 1993 04:13:48 GMT+0000 (UTC)',
	},
	{
		id: 3,
		user: 'Kari',
		fileAccessed: 'Oliver.pdf',
		date: 'Sat Apr 21 1984 11:07:41 GMT+0000 (UTC)',
	},
	{
		id: 4,
		user: 'Rojas',
		fileAccessed: 'Dejesus.pdf',
		date: 'Sat Feb 04 1978 18:35:08 GMT+0000 (UTC)',
	},
	{
		id: 5,
		user: 'Miles',
		fileAccessed: 'Sargent.pdf',
		date: 'Mon Sep 02 1991 18:34:41 GMT+0000 (UTC)',
	},
	{
		id: 6,
		user: 'Kenya',
		fileAccessed: 'Dunn.pdf',
		date: 'Thu Nov 07 2013 09:24:38 GMT+0000 (UTC)',
	},
	{
		id: 7,
		user: 'Dianne',
		fileAccessed: 'Blake.pdf',
		date: 'Mon Sep 03 1990 09:18:41 GMT+0000 (UTC)',
	},
	{
		id: 8,
		user: 'Bertha',
		fileAccessed: 'Cotton.pdf',
		date: 'Mon Jan 28 2002 02:31:08 GMT+0000 (UTC)',
	},
	{
		id: 9,
		user: 'Booker',
		fileAccessed: 'Gould.pdf',
		date: 'Wed Apr 25 2001 09:41:23 GMT+0000 (UTC)',
	},
	{
		id: 10,
		user: 'Palmer',
		fileAccessed: 'Mcpherson.pdf',
		date: 'Mon Jul 03 1972 23:26:46 GMT+0000 (UTC)',
	},
	{
		id: 11,
		user: 'Love',
		fileAccessed: 'Larsen.pdf',
		date: 'Fri Sep 12 1986 18:10:19 GMT+0000 (UTC)',
	},
	{
		id: 12,
		user: 'Frost',
		fileAccessed: 'Phelps.pdf',
		date: 'Wed Dec 17 2003 16:06:37 GMT+0000 (UTC)',
	},
	{
		id: 13,
		user: 'Decker',
		fileAccessed: 'Harrington.pdf',
		date: 'Fri Jun 15 2007 00:17:33 GMT+0000 (UTC)',
	},
	{
		id: 14,
		user: 'Tanisha',
		fileAccessed: 'Blankenship.pdf',
		date: 'Mon Aug 13 2012 21:09:19 GMT+0000 (UTC)',
	},
	{
		id: 15,
		user: 'Jeannine',
		fileAccessed: 'Sanders.pdf',
		date: 'Mon Aug 07 1995 11:01:37 GMT+0000 (UTC)',
	},
	{
		id: 16,
		user: 'Wise',
		fileAccessed: 'Rasmussen.pdf',
		date: 'Sun Dec 11 2016 13:46:50 GMT+0000 (UTC)',
	},
	{
		id: 17,
		user: 'Bettie',
		fileAccessed: 'Perez.pdf',
		date: 'Sun Sep 16 1990 09:59:17 GMT+0000 (UTC)',
	},
	{
		id: 18,
		user: 'Thompson',
		fileAccessed: 'Gordon.pdf',
		date: 'Thu Mar 18 2004 10:37:24 GMT+0000 (UTC)',
	},
	{
		id: 19,
		user: 'Nelson',
		fileAccessed: 'Davidson.pdf',
		date: 'Wed Jun 13 1973 15:45:03 GMT+0000 (UTC)',
	},
	{
		id: 20,
		user: 'Benjamin',
		fileAccessed: 'Hutchinson.pdf',
		date: 'Wed Feb 16 1983 06:10:34 GMT+0000 (UTC)',
	},
	{
		id: 21,
		user: 'Dudley',
		fileAccessed: 'Whitaker.pdf',
		date: 'Sun Feb 08 2015 21:40:38 GMT+0000 (UTC)',
	},
	{
		id: 22,
		user: 'Vilma',
		fileAccessed: 'Hansen.pdf',
		date: 'Wed Nov 14 2012 23:28:51 GMT+0000 (UTC)',
	},
	{
		id: 23,
		user: 'Battle',
		fileAccessed: 'Cochran.pdf',
		date: 'Mon Sep 02 1996 01:41:09 GMT+0000 (UTC)',
	},
	{
		id: 24,
		user: 'Augusta',
		fileAccessed: 'Grant.pdf',
		date: 'Fri Oct 03 1975 04:48:46 GMT+0000 (UTC)',
	},
	{
		id: 25,
		user: 'Tabatha',
		fileAccessed: 'Carey.pdf',
		date: 'Sun Apr 24 1994 11:20:45 GMT+0000 (UTC)',
	},
	{
		id: 26,
		user: 'Berry',
		fileAccessed: 'Atkinson.pdf',
		date: 'Sat Jan 04 2020 06:44:15 GMT+0000 (UTC)',
	},
	{
		id: 27,
		user: 'Wright',
		fileAccessed: 'Kirk.pdf',
		date: 'Thu May 29 1980 11:02:18 GMT+0000 (UTC)',
	},
	{
		id: 28,
		user: 'Ramona',
		fileAccessed: 'Morin.pdf',
		date: 'Sat Jan 25 1975 03:14:03 GMT+0000 (UTC)',
	},
	{
		id: 29,
		user: 'Grace',
		fileAccessed: 'Hendricks.pdf',
		date: 'Sun May 22 1977 05:14:25 GMT+0000 (UTC)',
	},
	{
		id: 30,
		user: 'Dyer',
		fileAccessed: 'Dudley.pdf',
		date: 'Mon May 28 2012 19:00:10 GMT+0000 (UTC)',
	},
	{
		id: 31,
		user: 'Ross',
		fileAccessed: 'Riddle.pdf',
		date: 'Wed Oct 11 1978 01:47:08 GMT+0000 (UTC)',
	},
	{
		id: 32,
		user: 'Silva',
		fileAccessed: 'Lane.pdf',
		date: 'Fri Mar 03 2017 22:58:42 GMT+0000 (UTC)',
	},
	{
		id: 33,
		user: 'Addie',
		fileAccessed: 'Norman.pdf',
		date: 'Fri Jul 02 2004 17:32:48 GMT+0000 (UTC)',
	},
	{
		id: 34,
		user: 'Jackie',
		fileAccessed: 'Perkins.pdf',
		date: 'Thu Jun 15 2000 04:17:17 GMT+0000 (UTC)',
	},
	{
		id: 35,
		user: 'Marla',
		fileAccessed: 'Zamora.pdf',
		date: 'Thu Jul 17 1997 05:00:58 GMT+0000 (UTC)',
	},
	{
		id: 36,
		user: 'Sara',
		fileAccessed: 'Bentley.pdf',
		date: 'Thu Oct 02 1986 14:08:02 GMT+0000 (UTC)',
	},
	{
		id: 37,
		user: 'Tran',
		fileAccessed: 'Rodriguez.pdf',
		date: 'Sat Jul 23 1983 13:20:09 GMT+0000 (UTC)',
	},
	{
		id: 38,
		user: 'Chris',
		fileAccessed: 'Cabrera.pdf',
		date: 'Thu May 05 2016 18:45:41 GMT+0000 (UTC)',
	},
	{
		id: 39,
		user: 'Tate',
		fileAccessed: 'Moon.pdf',
		date: 'Sat Feb 08 2003 12:28:31 GMT+0000 (UTC)',
	},
	{
		id: 40,
		user: 'Heath',
		fileAccessed: 'Moreno.pdf',
		date: 'Wed Jul 01 1970 15:07:01 GMT+0000 (UTC)',
	},
	{
		id: 41,
		user: 'Keisha',
		fileAccessed: 'Nicholson.pdf',
		date: 'Fri Aug 14 1987 04:00:04 GMT+0000 (UTC)',
	},
	{
		id: 42,
		user: 'Houston',
		fileAccessed: 'Ray.pdf',
		date: 'Sat Aug 22 2015 04:26:33 GMT+0000 (UTC)',
	},
	{
		id: 43,
		user: 'Julia',
		fileAccessed: 'Wise.pdf',
		date: 'Sun Jun 20 1976 22:28:24 GMT+0000 (UTC)',
	},
	{
		id: 44,
		user: 'Adriana',
		fileAccessed: 'Kelley.pdf',
		date: 'Tue May 20 1980 02:03:57 GMT+0000 (UTC)',
	},
	{
		id: 45,
		user: 'Tara',
		fileAccessed: 'Lindsey.pdf',
		date: 'Mon Mar 19 2018 20:18:17 GMT+0000 (UTC)',
	},
	{
		id: 46,
		user: 'Johnnie',
		fileAccessed: 'Roy.pdf',
		date: 'Sun Oct 30 1983 17:05:23 GMT+0000 (UTC)',
	},
	{
		id: 47,
		user: 'Tillman',
		fileAccessed: 'Blackwell.pdf',
		date: 'Mon Oct 13 2014 21:45:34 GMT+0000 (UTC)',
	},
	{
		id: 48,
		user: 'Norma',
		fileAccessed: 'Meadows.pdf',
		date: 'Thu Aug 25 1994 19:16:05 GMT+0000 (UTC)',
	},
	{
		id: 49,
		user: 'Hart',
		fileAccessed: 'Sherman.pdf',
		date: 'Sat Jul 18 1981 03:39:53 GMT+0000 (UTC)',
	},
	{
		id: 50,
		user: 'Odonnell',
		fileAccessed: 'Bridges.pdf',
		date: 'Sat Aug 09 1997 11:30:30 GMT+0000 (UTC)',
	},
	{
		id: 51,
		user: 'Carmela',
		fileAccessed: 'Weaver.pdf',
		date: 'Wed Mar 29 1995 00:38:11 GMT+0000 (UTC)',
	},
	{
		id: 52,
		user: 'Karyn',
		fileAccessed: 'Dominguez.pdf',
		date: 'Wed Dec 20 1989 17:00:08 GMT+0000 (UTC)',
	},
	{
		id: 53,
		user: 'Payne',
		fileAccessed: 'Rowe.pdf',
		date: 'Fri Jul 14 1978 19:30:09 GMT+0000 (UTC)',
	},
	{
		id: 54,
		user: 'David',
		fileAccessed: 'Black.pdf',
		date: 'Thu Mar 03 2011 11:53:27 GMT+0000 (UTC)',
	},
	{
		id: 55,
		user: 'Sandoval',
		fileAccessed: 'Snider.pdf',
		date: 'Wed Oct 24 2018 16:53:37 GMT+0000 (UTC)',
	},
	{
		id: 56,
		user: 'Latoya',
		fileAccessed: 'Ferguson.pdf',
		date: 'Fri Jul 13 2012 23:59:18 GMT+0000 (UTC)',
	},
	{
		id: 57,
		user: 'Deann',
		fileAccessed: 'Mullins.pdf',
		date: 'Tue Aug 10 1976 19:00:02 GMT+0000 (UTC)',
	},
	{
		id: 58,
		user: 'Helene',
		fileAccessed: 'Washington.pdf',
		date: 'Mon Jul 28 2003 02:30:40 GMT+0000 (UTC)',
	},
	{
		id: 59,
		user: 'Maria',
		fileAccessed: 'Lynn.pdf',
		date: 'Wed Aug 02 1989 21:01:25 GMT+0000 (UTC)',
	},
	{
		id: 60,
		user: 'Edwina',
		fileAccessed: 'Knight.pdf',
		date: 'Mon Aug 26 2002 04:26:56 GMT+0000 (UTC)',
	},
	{
		id: 61,
		user: 'Janie',
		fileAccessed: 'Gillespie.pdf',
		date: 'Sun Feb 24 2013 01:07:28 GMT+0000 (UTC)',
	},
	{
		id: 62,
		user: 'Irwin',
		fileAccessed: 'Everett.pdf',
		date: 'Sun Apr 16 1978 12:06:24 GMT+0000 (UTC)',
	},
	{
		id: 63,
		user: 'Alvarado',
		fileAccessed: 'Booth.pdf',
		date: 'Fri Sep 07 1973 16:17:20 GMT+0000 (UTC)',
	},
	{
		id: 64,
		user: 'Lang',
		fileAccessed: 'Tyson.pdf',
		date: 'Mon May 15 2000 15:05:21 GMT+0000 (UTC)',
	},
	{
		id: 65,
		user: 'Acosta',
		fileAccessed: 'Bell.pdf',
		date: 'Sun Nov 16 2003 18:24:16 GMT+0000 (UTC)',
	},
	{
		id: 66,
		user: 'Saunders',
		fileAccessed: 'Walsh.pdf',
		date: 'Wed Jul 13 1983 12:58:24 GMT+0000 (UTC)',
	},
	{
		id: 67,
		user: 'Shelley',
		fileAccessed: 'Larson.pdf',
		date: 'Sun Nov 28 2010 00:19:50 GMT+0000 (UTC)',
	},
	{
		id: 68,
		user: 'Essie',
		fileAccessed: 'Marshall.pdf',
		date: 'Wed Oct 12 1983 06:59:15 GMT+0000 (UTC)',
	},
	{
		id: 69,
		user: 'Shawn',
		fileAccessed: 'Foreman.pdf',
		date: 'Mon Nov 06 2006 00:58:18 GMT+0000 (UTC)',
	},
	{
		id: 70,
		user: 'Angelita',
		fileAccessed: 'Stephens.pdf',
		date: 'Thu Nov 15 1979 16:37:07 GMT+0000 (UTC)',
	},
	{
		id: 71,
		user: 'Ewing',
		fileAccessed: 'James.pdf',
		date: 'Wed Feb 11 2015 20:27:49 GMT+0000 (UTC)',
	},
	{
		id: 72,
		user: 'Bruce',
		fileAccessed: 'Ramos.pdf',
		date: 'Sat Jul 14 1990 08:13:04 GMT+0000 (UTC)',
	},
	{
		id: 73,
		user: 'Sharon',
		fileAccessed: 'Patterson.pdf',
		date: 'Sun Jun 24 1990 00:02:30 GMT+0000 (UTC)',
	},
	{
		id: 74,
		user: 'Juliette',
		fileAccessed: 'Suarez.pdf',
		date: 'Thu Sep 03 1981 01:07:39 GMT+0000 (UTC)',
	},
	{
		id: 75,
		user: 'Patty',
		fileAccessed: 'Luna.pdf',
		date: 'Mon Oct 30 2017 17:22:58 GMT+0000 (UTC)',
	},
	{
		id: 76,
		user: 'Joann',
		fileAccessed: 'Mcdaniel.pdf',
		date: 'Thu Mar 01 1990 12:44:26 GMT+0000 (UTC)',
	},
	{
		id: 77,
		user: 'Colon',
		fileAccessed: 'Mcconnell.pdf',
		date: 'Fri Jul 12 2013 03:10:43 GMT+0000 (UTC)',
	},
	{
		id: 78,
		user: 'Leah',
		fileAccessed: 'Wilkerson.pdf',
		date: 'Tue Nov 13 2001 04:49:07 GMT+0000 (UTC)',
	},
	{
		id: 79,
		user: 'Georgina',
		fileAccessed: 'Humphrey.pdf',
		date: 'Wed May 16 1979 16:15:59 GMT+0000 (UTC)',
	},
	{
		id: 80,
		user: 'Aileen',
		fileAccessed: 'Spears.pdf',
		date: 'Tue Aug 10 1999 20:14:35 GMT+0000 (UTC)',
	},
	{
		id: 81,
		user: 'Lourdes',
		fileAccessed: 'Poole.pdf',
		date: 'Fri Sep 20 1985 15:03:21 GMT+0000 (UTC)',
	},
	{
		id: 82,
		user: 'Jeanne',
		fileAccessed: 'Kelly.pdf',
		date: 'Sat Aug 22 2015 18:26:46 GMT+0000 (UTC)',
	},
	{
		id: 83,
		user: 'Casey',
		fileAccessed: 'Moss.pdf',
		date: 'Mon Aug 02 2010 16:34:58 GMT+0000 (UTC)',
	},
	{
		id: 84,
		user: 'Nell',
		fileAccessed: 'Daniels.pdf',
		date: 'Tue Nov 26 1974 17:16:41 GMT+0000 (UTC)',
	},
	{
		id: 85,
		user: 'Avery',
		fileAccessed: 'Romero.pdf',
		date: 'Fri Jul 14 2006 14:32:54 GMT+0000 (UTC)',
	},
	{
		id: 86,
		user: 'Justine',
		fileAccessed: 'Young.pdf',
		date: 'Mon May 08 1989 07:52:36 GMT+0000 (UTC)',
	},
	{
		id: 87,
		user: 'Henry',
		fileAccessed: 'Compton.pdf',
		date: 'Mon Oct 24 2005 17:13:51 GMT+0000 (UTC)',
	},
	{
		id: 88,
		user: 'Merritt',
		fileAccessed: 'Velazquez.pdf',
		date: 'Sat Jun 02 2012 12:19:24 GMT+0000 (UTC)',
	},
	{
		id: 89,
		user: 'Pollard',
		fileAccessed: 'Hoover.pdf',
		date: 'Sun Jan 14 1973 21:45:26 GMT+0000 (UTC)',
	},
	{
		id: 90,
		user: 'Valarie',
		fileAccessed: 'Carlson.pdf',
		date: 'Sun Oct 19 2003 08:58:52 GMT+0000 (UTC)',
	},
	{
		id: 91,
		user: 'Madeline',
		fileAccessed: 'Brennan.pdf',
		date: 'Tue Oct 25 1994 09:24:31 GMT+0000 (UTC)',
	},
	{
		id: 92,
		user: 'Mona',
		fileAccessed: 'Garrison.pdf',
		date: 'Mon Dec 10 1984 15:03:24 GMT+0000 (UTC)',
	},
	{
		id: 93,
		user: 'Le',
		fileAccessed: 'Mccarty.pdf',
		date: 'Mon Aug 13 2001 07:16:25 GMT+0000 (UTC)',
	},
	{
		id: 94,
		user: 'Gentry',
		fileAccessed: 'Griffith.pdf',
		date: 'Mon Jan 03 1977 00:02:17 GMT+0000 (UTC)',
	},
	{
		id: 95,
		user: 'Rena',
		fileAccessed: 'Ortiz.pdf',
		date: 'Sun Jul 15 1979 19:55:29 GMT+0000 (UTC)',
	},
	{
		id: 96,
		user: 'Howell',
		fileAccessed: 'Valencia.pdf',
		date: 'Thu Nov 11 1971 08:34:10 GMT+0000 (UTC)',
	},
	{
		id: 97,
		user: 'Eaton',
		fileAccessed: 'Bernard.pdf',
		date: 'Sat May 22 2010 03:14:54 GMT+0000 (UTC)',
	},
	{
		id: 98,
		user: 'Shannon',
		fileAccessed: 'Roberts.pdf',
		date: 'Tue Jan 28 2020 11:26:48 GMT+0000 (UTC)',
	},
	{
		id: 99,
		user: 'Mari',
		fileAccessed: 'Cervantes.pdf',
		date: 'Sat Jul 26 2003 01:29:43 GMT+0000 (UTC)',
	},
];

const columns = [
	{
		dataField: 'user',
		text: 'User Name',
		filter: textFilter(),
		sort: true,
		headerStyle: {
			backgroundColor: variables.greenColor,
			color: variables.whiteColor,
		},
	},
	{
		dataField: 'fileAccessed',
		text: 'File Accessed',
		filter: textFilter(),
		sort: true,
		headerStyle: {
			backgroundColor: variables.greenColor,
			color: variables.whiteColor,
		},
	},
	{
		dataField: 'date',
		text: 'Date',
		filter: dateFilter({}),
		sort: true,
		sortFunc: (a: any, b: any, order: string, dataField: any, rowA: any, rowB: any) => {
			a = new Date(a);
			b = new Date(b);
			if (order === 'asc') {
				return b - a;
			}
			return a - b;
		},
		formatter: dateFormatter,
		headerStyle: {
			backgroundColor: variables.greenColor,
			color: variables.whiteColor,
		},
	},
];

const paginationOptions = {
	paginationSize: 5,
	pageStartIndex: 1,
	// alwaysShowAllBtns: true, // Always show next and previous button
	// withFirstAndLast: false, // Hide the going to First and Last page button
	// hideSizePerPage: true, // Hide the sizePerPage dropdown always
	hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
	firstPageText: 'First',
	prePageText: 'Back',
	nextPageText: 'Next',
	lastPageText: 'Last',
	nextPageTitle: 'First page',
	prePageTitle: 'Pre page',
	firstPageTitle: 'Next page',
	lastPageTitle: 'Last page',
	showTotal: true,
	disablePageTitle: true,
	sizePerPageList: [
		{
			text: '5',
			value: 5,
		},
		{
			text: '10',
			value: 10,
		},
		{
			text: 'All',
			value: tableData.length,
		},
	], // A numeric array is also available. the purpose of above example is custom the text
};

const Grid: FunctionComponent = () => {
	const [isDesktop, setIsDesktop] = useState<boolean>(false);
	const [showCollapseContent, setCollapse] = useState<boolean>(false);

	const handleResize = (entries: IResizeEntry[]) => {
		entries.map((e) => {
			if (e.contentRect.width > minDeskTopWidth) {
				setIsDesktop(true);
			} else {
				setIsDesktop(false);
			}
		});
	};

	const renderGrid = () => (
		<BootstrapTable
			bootstrap4
			keyField="id"
			data={tableData}
			columns={columns}
			filter={filterFactory()}
			filterPosition="top"
			pagination={paginationFactory(paginationOptions)}
		/>
	);

	return (
		<>
			{!isDesktop && (
				<Button fill onClick={() => setCollapse(!showCollapseContent)}>
					{showCollapseContent ? 'Hide' : 'Show'} table
				</Button>
			)}
			<ResizeSensor onResize={handleResize}>
				{!isDesktop ? (
					<Collapse isOpen={showCollapseContent} keepChildrenMounted className="pt-2">
						{renderGrid()}
					</Collapse>
				) : (
					renderGrid()
				)}
			</ResizeSensor>
		</>
	);
};

export default Grid;
