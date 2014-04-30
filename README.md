Team America - Alex Bahm & Connor Jackson
======================

Yelp Database Project
=====================

Installation steps:
1. Install MySQL
2. Install Nodejs
3. Restore data from the database
4. Create the views in the database
	<code>
		create view bestbusiness as 
select review.business_id as review_business_ID, business.business_id as business_business_ID, business.name as name, review.stars, postDate 
from review JOIN business
	ON (review.business_id = business.business_id);
	</code>
	<code>
		create view bestbusiness as 
select review.business_id as review_business_ID, business.business_id as business_business_ID, business.name as business_name, review.stars, postDate, categoryName, useful, review
from review 
JOIN business
	ON (review.business_id = business.business_id)
JOIN category
	ON (review.business_id = category.business_id);
	</code>
	<code>create view steadily as 
select business.business_id, business.name as business_name, review.stars, postDate
from review 
JOIN business
	ON (review.business_id = business.business_id)
where postDate between '2012-01-01' AND '2012-12-31'
	</code>
	<code>create view s01 as 
select business_name, business_id, avg(stars) as avgstar from steadily
where postDate between '2012-01-01' AND '2012-03-31'
group by business_name
order by avg (stars) desc
	</code>
	<code>
		create view s04 as 
select business_name, business_id, avg(stars) as avgstar from steadily
where postDate between '2012-04-01' AND '2012-06-30'
group by business_name
order by avg (stars) desc
	</code>
	<code>
	create view s07 as 
select business_name, business_id, avg(stars) as avgstar from steadily
where postDate between '2012-07-01' AND '2012-09-30' 
group by business_name
order by avg (stars) desc
	</code>
	<code>
		create view s010 as 
select business_name, business_id, avg(stars) as avgstar from steadily
where postDate between '2012-10-01' AND '2012-12-31'
group by business_name
order by avg (stars) desc
	</code>
5. Install the necessary packages using the command line (cd'd to the project folder)
	<code>npm install</code>
	<code>bower install</code>
6. Launch the server
	<code>node server.js</code>
7. Check it out! In your webbrowser, go to localhost:3000