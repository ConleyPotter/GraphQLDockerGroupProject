function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
	var angleInRadians = (angleInDegrees - 180) * Math.PI / 180.0;

	return {
		x: centerX + radius * Math.cos(angleInRadians),
		y: centerY + radius * Math.sin(angleInRadians)
	};
}

export function describeArc({ centerX, centerY, radius, startAngle, endAngle }) {
	var start = polarToCartesian(centerX, centerY, radius, endAngle);
	var end = polarToCartesian(centerX, centerY, radius, startAngle);

	var largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

	var d = ['M', start.x, start.y, 'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(' ');

	return d;
}
