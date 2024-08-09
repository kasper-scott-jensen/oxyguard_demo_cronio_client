<script>
    import { attendanceData } from "../../stores/attendanceStore.js";
    import * as d3 from "d3";

    let data = [];
    let attendance = [];

    $: attendanceData.subscribe((value) => {
        attendance = value;
        transformData();
    });

    let width = 980;
    let height = 350;
    let marginTop = 20;
    let marginRight = 30;
    let marginBottom = 30;
    let marginLeft = 40;
    
    let xScale;
    let yScale;
    let line;

    $: if (data.length > 0) {
        xScale = d3
            .scaleTime()
            .domain(d3.extent(data, (d) => new Date(d.date)))
            .range([marginLeft, width - marginRight])
            .nice(d3.timeMonth);

        yScale = d3.scaleLinear(
            [0, d3.max(data, (d) => +d.time)],
            [height - marginBottom, marginTop],
        );
        line = d3
            .line()
            .x((d) => xScale(new Date(d.date)))
            .y((d) => yScale(+d.time));
    }

    function transformData() {
        attendance.sort((a, b) => {
            const dateA = new Date(`${a.start_date}T${a.start_time}`);
            const dateB = new Date(`${b.start_date}T${b.start_time}`);
            return dateA - dateB;
        });
        let result = {};
        attendance.forEach((item) => {
            const { start_date, start_time, end_date, end_time } = item;
            const startDate = new Date(`${start_date}T${start_time}`);
            const endDate = new Date(`${end_date}T${end_time}`);
            const timeDiff =
                (endDate - startDate) / (1000 * 60 * 60).toFixed(2);
            if (!result[start_date]) {
                result[start_date] = timeDiff;
            } else {
                result[start_date] += timeDiff;
            }
        });
        data = Object.keys(result).map((date) => ({
            date,
            time: result[date],
        }));
    }
</script>

<div
    class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700"
>
    <div class="rounded-t mb-0 px-4 py-3 bg-transparent">
        <div class="flex flex-wrap items-center">
            <div class="relative w-full max-w-full flex-grow flex-1">
                <h6
                    class="uppercase text-blueGray-100 mb-1 text-xs font-semibold"
                >
                    Overview
                </h6>
                <h2 class="text-white text-xl font-semibold">Hours Logged</h2>
            </div>
        </div>
    </div>
    <div class="p-4 flex-auto">
        <div class="relative h-350-px text-sm text-blueGray-300">
            {#if data && data.length > 0}
                <svg
                    {width}
                    {height}
                    style:max-width="100%"
                    style:height="350px"
                >
                    <g transform="translate(0,{height - marginBottom})">
                        {#each xScale.ticks(d3.timeMonth) as tick}
                            <line
                                stroke="currentColor"
                                x1={xScale(tick)}
                                x2={xScale(tick)}
                                y1={0}
                                y2={6}
                            />

                            <text
                                fill="currentColor"
                                text-anchor="middle"
                                x={xScale(tick)}
                                y={22}
                            >
                                {d3.timeFormat("%b")(tick)}
                            </text>
                        {/each}
                    </g>
                    <g transform="translate({marginLeft},0)">
                        {#each yScale.ticks() as tick}
                            {#if tick !== 0}
                                <line
                                    stroke="currentColor"
                                    stroke-opacity="0.1"
                                    x1={0}
                                    x2={width - marginLeft}
                                    y1={yScale(tick)}
                                    y2={yScale(tick)}
                                />

                                <line
                                    stroke="currentColor"
                                    x1={0}
                                    x2={-6}
                                    y1={yScale(tick)}
                                    y2={yScale(tick)}
                                />
                            {/if}

                            <text
                                fill="currentColor"
                                text-anchor="end"
                                dominant-baseline="middle"
                                x={-9}
                                y={yScale(tick)}
                            >
                                {tick}
                            </text>
                        {/each}
                        <text
                            fill="currentColor"
                            text-anchor="start"
                            x={-marginLeft}
                            y={15}
                        >
                        </text>
                    </g>
                    <path
                        fill="none"
                        stroke="steelblue"
                        stroke-width="3"
                        d={line(data)}
                    />
                </svg>
            {/if}
        </div>
    </div>
</div>
