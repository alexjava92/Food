--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: adminpack; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION adminpack; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: menu; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.menu (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    price numeric(10,2) NOT NULL,
    description text,
    amount character varying(100)
);


ALTER TABLE public.menu OWNER TO postgres;

--
-- Name: menu_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.menu_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.menu_id_seq OWNER TO postgres;

--
-- Name: menu_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.menu_id_seq OWNED BY public.menu.id;


--
-- Name: order_history; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_history (
    id integer NOT NULL,
    items jsonb NOT NULL,
    total_quantity integer NOT NULL,
    total_price numeric(10,2) NOT NULL,
    status character varying(255) NOT NULL
);


ALTER TABLE public.order_history OWNER TO postgres;

--
-- Name: order_history_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.order_history_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.order_history_id_seq OWNER TO postgres;

--
-- Name: order_history_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.order_history_id_seq OWNED BY public.order_history.id;


--
-- Name: order_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_items (
    order_id integer,
    name character varying(255) NOT NULL,
    price numeric(10,2) NOT NULL,
    quantity integer NOT NULL
);


ALTER TABLE public.order_items OWNER TO postgres;

--
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    total_quantity integer NOT NULL,
    total_price numeric(10,2) NOT NULL,
    status text
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.orders_id_seq OWNER TO postgres;

--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- Name: menu id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.menu ALTER COLUMN id SET DEFAULT nextval('public.menu_id_seq'::regclass);


--
-- Name: order_history id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_history ALTER COLUMN id SET DEFAULT nextval('public.order_history_id_seq'::regclass);


--
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- Data for Name: menu; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.menu (id, name, price, description, amount) FROM stdin;
\.


--
-- Data for Name: order_history; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.order_history (id, items, total_quantity, total_price, status) FROM stdin;
\.


--
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.order_items (order_id, name, price, quantity) FROM stdin;
1	╨и╨░╤Г╤А╨╝╨░ ╨║╨╗╨░╤Б╤Б╨╕╤З╨╡╤Б╨║╨░╤П	185.00	1
2	╨и╨░╤Г╤А╨╝╨░ ╨║╨╗╨░╤Б╤Б╨╕╤З╨╡╤Б╨║╨░╤П	185.00	1
2	HOT-╨и╨Р╨г╨а╨Ь╨Р	190.00	1
3	HOT-╨и╨Р╨г╨а╨Ь╨Р	190.00	4
3	╨б╤Н╨╜╨┤╨▓╨╕╤З c ╨║╤Г╤А╨╕╤Ж╨╡╨╣	199.00	5
3	╨з╨╕╨║╨╡╨╜╤Б╤Л 7 ╤И╤В.	120.00	4
4	HOT-╨и╨Р╨г╨а╨Ь╨Р	190.00	5
4	╨и╨░╤Г╤А╨╝╨░ ╨║╨╗╨░╤Б╤Б╨╕╤З╨╡╤Б╨║╨░╤П	185.00	4
4	╨з╨╕╨║╨╡╨╜╤Б╤Л 7 ╤И╤В.	120.00	2
4	╨Ъ╨╛╤Д╨╡	50.00	5
4	╨з╨░╨╣	30.00	3
4	╨У╤А╨╡╨╜╨║╨╕ ╤Б ╨▒╨╡╨║╨╛╨╜╨╛╨╝ 5 ╤И╤В.	980.00	3
4	╨Ъ╨░╤А╤В╨╛╤Д╨╡╨╗╤М ╤Д╤А╨╕ 100 ╨│╤А.	90.00	3
4	╨и╨╛╨║╨╛╨╗╨░╨┤	30.00	2
4	╨Ъ╨╛╨╜╤Д╨╡╤В╤Л	20.00	2
4	╨Я╨╡╤З╨╡╨╜╤М╨╡	30.00	1
4	╨е╨╗╨╡╨▒	20.00	1
4	╨С╤Г╨╗╨╛╤З╨║╨░	15.00	1
5	HOT-╨и╨Р╨г╨а╨Ь╨Р	190.00	1
6	HOT-╨и╨Р╨г╨а╨Ь╨Р	190.00	2
6	╨и╨░╤Г╤А╨╝╨░ ╨║╨╗╨░╤Б╤Б╨╕╤З╨╡╤Б╨║╨░╤П	185.00	2
7	╨з╨╕╨║╨╡╨╜╤Б╤Л 7 ╤И╤В.	120.00	2
7	╨Ъ╨░╤А╤В╨╛╤Д╨╡╨╗╤М ╤Д╤А╨╕ 100 ╨│╤А.	90.00	2
7	╨б╤Л╤А╨╜╤Л╨╡ ╨┐╨░╨╗╨╛╤З╨║╨╕ 7 ╤И╤В.	130.00	4
7	╨в╨╛╤А╤В	200.00	4
7	╨Ь╨╛╤А╨╛╨╢╨╡╨╜╨╛╨╡	50.00	4
7	╨и╨╛╨║╨╛╨╗╨░╨┤	30.00	4
7	╨Т╨╛╨┤╨░	20.00	2
7	╨з╨░╨╣	30.00	2
7	╨Ъ╨╛╤Д╨╡	50.00	2
7	╨б╨╛╨║	40.00	2
7	╨Ъ╨╛╨╜╤Д╨╡╤В╤Л	20.00	2
7	╨Я╨╡╤З╨╡╨╜╤М╨╡	30.00	2
8	HOT-╨и╨Р╨г╨а╨Ь╨Р	190.00	1
9	HOT-╨и╨Р╨г╨а╨Ь╨Р	190.00	1
10	HOT-╨и╨Р╨г╨а╨Ь╨Р	190.00	1
11	HOT-╨и╨Р╨г╨а╨Ь╨Р	190.00	1
12	╨и╨░╤Г╤А╨╝╨░ ╨║╨╗╨░╤Б╤Б╨╕╤З╨╡╤Б╨║╨░╤П	185.00	1
13	╨и╨░╤Г╤А╨╝╨░ ╨║╨╗╨░╤Б╤Б╨╕╤З╨╡╤Б╨║╨░╤П	185.00	3
15	╨Ъ╨░╤А╤В╨╛╤Д╨╡╨╗╤М ╨┤╨╡╤А╨╡╨▓╨╡╨╜╤Б╨║╨╕╨╣ 80╨│╤А.	90.00	1
15	HOT-╨и╨Р╨г╨а╨Ь╨Р	190.00	1
16	HOT-╨и╨Р╨г╨а╨Ь╨Р	190.00	1
17	HOT-╨и╨Р╨г╨а╨Ь╨Р	190.00	1
17	╨б╤Н╨╜╨┤╨▓╨╕╤З c ╨║╤Г╤А╨╕╤Ж╨╡╨╣	199.00	1
17	╨з╨╕╨║╨╡╨╜╤Б╤Л 7 ╤И╤В.	120.00	1
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (id, total_quantity, total_price, status) FROM stdin;
12	1	185.00	\N
1	1	185.00	true
2	2	375.00	true
13	3	555.00	removed
3	13	2235.00	issued
15	2	280.00	new
16	1	190.00	new
17	3	509.00	new
4	32	5645.00	completed
5	1	190.00	completed
6	4	750.00	completed
11	1	190.00	completed
10	1	190.00	completed
9	1	190.00	completed
8	1	190.00	completed
7	32	2440.00	completed
\.


--
-- Name: menu_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.menu_id_seq', 1, false);


--
-- Name: order_history_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_history_id_seq', 1, false);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_id_seq', 1, false);


--
-- Name: menu menu_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.menu
    ADD CONSTRAINT menu_pkey PRIMARY KEY (id);


--
-- Name: order_history order_history_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_history
    ADD CONSTRAINT order_history_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: idx_order_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_order_id ON public.order_items USING btree (order_id);


--
-- Name: order_items order_items_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id);


--
-- PostgreSQL database dump complete
--

